import React from "react";
import classes from "./login.module.css";
import Form from "./Form";

const Login = () => {
	return (
		<div className={classes.login}>
			<h1 className={classes.login__title}>login</h1>
			<Form />
		</div>
	);
};

export default Login;
