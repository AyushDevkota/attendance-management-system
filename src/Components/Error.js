import classes from "./error.module.css";

const Error = ({ msg }) => {
	return <p className={classes.error}>{msg}</p>;
};

export default Error;
