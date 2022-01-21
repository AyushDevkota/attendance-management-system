import { useState } from "react";
import Button from "./Button";
import classes from "./form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../Store/login";
import { userActions } from "../Store/user";
import Error from "./Error";
import { useNavigate } from "react-router-dom";

const Form = () => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const dispatch = useDispatch();
	const username = useSelector((state) => state.login.username);
	const password = useSelector((state) => state.login.password);
	const users = useSelector((state) => state.users);

	const usernameChangeHandler = (e) => {
		dispatch(loginActions.updateUsername(e.target.value));
		setShowError(false);
	};

	const passwordChangeHandler = (e) => {
		dispatch(loginActions.updatePassword(e.target.value));
		setShowError(false);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		const filteredUser = users.filter(
			(user) => user.username === username && user.password === password
		);
		if (filteredUser.length === 0) {
			setShowError(true);
		} else {
			const username = filteredUser[0].username;
			dispatch(userActions.login(username));
			navigate(`/profile/${username}`);
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<input
				type="text"
				name="username"
				placeholder="Username"
				className={classes.form__input}
				onChange={usernameChangeHandler}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				className={classes.form__input}
				onChange={passwordChangeHandler}
			/>
			{showError && <Error msg="Please enter valid credentials" />}
			<Button text="Submit" bgColor="gray" textColor="black" />
		</form>
	);
};

export default Form;
