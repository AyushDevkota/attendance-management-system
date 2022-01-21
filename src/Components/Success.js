import React from "react";
import classes from "./success.module.css";

const Success = ({ msg }) => {
	return (
		<div className={classes.success}>
			<p>{msg} successful.</p>
		</div>
	);
};

export default Success;
