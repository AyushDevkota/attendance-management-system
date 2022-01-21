import classes from "./form.module.css";
import Button from "./Button";
import Error from "./Error";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../Store/user";
import { checkSameDay } from "../Helper";

const INITIAL_STATE = {
	username: "",
	password: "",
	attendance: "default",
	remarks: "",
	date: new Date().getTime(),
};
const ModalForm = ({ setSuccess, setShowModal, setMsg }) => {
	const dispatch = useDispatch();
	const [showError, setShowError] = useState(false);
	const [error, setError] = useState("");
	const [input, setInput] = useState(INITIAL_STATE);

	const users = useSelector((state) => state.users);

	const submitHandler = (e) => {
		e.preventDefault();
		const filteredUser = users.filter(
			(user) =>
				user.username === input.username && user.password === input.password
		);
		if (filteredUser.length === 0) {
			setShowError(true);
			setError("User doesn't exist");
			return;
		}
		if (input.attendance === "default" || !input.remarks) {
			setShowError(true);
			setError("Please enter valid data");
			return;
		}
		setInput({ ...input, date: new Date().getTime() });
		if (!validateAttendance(filteredUser[0])) return;
		setShowModal(false);
		setSuccess(true);
		setTimeout(() => setSuccess(false), 3000);
	};

	const handleChange = (e) => {
		setShowError(false);
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	const validateAttendance = (user) => {
		if (user.info.length === 0 && input.attendance === "checkin") {
			dispatch(userActions.checkIn(input));
			setMsg("Check in");
			return true;
		}
		if (user.info.length === 0 && input.attendance === "checkout") {
			setShowError(true);
			setError("Please check in first");
			return false;
		}
		if (user.info.length > 0 && input.attendance === "checkin") {
			const test = user.info.filter((detail) =>
				checkSameDay(input.date, detail.checkInDate)
			);
			if (test.length === 0) {
				dispatch(userActions.checkIn(input));
				setMsg("Check in");
				return true;
			} else {
				setShowError(true);
				setError("Already checked in");
				return false;
			}
		}
		if (user.info.length > 0 && input.attendance === "checkout") {
			const test = user.info.filter((detail) =>
				checkSameDay(input.date, detail.checkInDate)
			);
			if (test.length > 0) {
				dispatch(userActions.checkOut(input));
				setMsg("Check out");
				return true;
			} else {
				setShowError(true);
				setError("Please check in first.");
				return false;
			}
		}
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<input
				type="text"
				name="username"
				placeholder="Username"
				className={classes.form__input}
				onChange={handleChange}
				value={input.username}
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				className={classes.form__input}
				onChange={handleChange}
				value={input.password}
			/>
			<select
				name="attendance"
				className={classes.form__input}
				onChange={handleChange}
				defaultValue={input.attendance}
			>
				<option value="default" disabled hidden>
					Please select direction of attendance
				</option>
				<option value="checkin">Check In</option>
				<option value="checkout">Check Out</option>
			</select>
			<textarea
				name="remarks"
				cols="30"
				rows="10"
				placeholder="Remarks"
				className={classes.form__input}
				onChange={handleChange}
				value={input.remarks}
			></textarea>
			{showError && <Error msg={error} />}
			<Button text="Submit" />
		</form>
	);
};

export default ModalForm;
