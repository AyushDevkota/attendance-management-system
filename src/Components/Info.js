import classes from "./info.module.css";
import { userActions } from "../Store/user";
import { useDispatch } from "react-redux";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const Info = ({ data, name }) => {
	const dispatch = useDispatch();
	const formattedCheckInDate = new Date(data.checkInDate);
	const formattedCheckOutDate = new Date(data.checkOutDate);

	const date = `${
		months[formattedCheckInDate.getMonth()]
	} ${formattedCheckInDate.getDate()}, ${formattedCheckInDate.getFullYear()}`;

	const status =
		data.checkedIn && data.checkedOut
			? "Present"
			: data.checkedIn && !data.checkedOut
			? "Missed"
			: !data.checkedIn && !data.checkedOut
			? "Absent"
			: null;

	const deleteHandler = () => {
		dispatch(userActions.delete({ date: data.checkInDate, username: name }));
	};

	return (
		<div className={classes.info}>
			<div className={classes.info__btnContainer}>
				<button onClick={deleteHandler}>Delete</button>
			</div>
			<p>Date: {date}</p>
			<p>Check In Time: {formattedCheckInDate.toLocaleTimeString("en-US")}</p>
			<p>
				Check Out Time:{" "}
				{data.checkOutDate === null
					? "N/A"
					: formattedCheckOutDate.toLocaleTimeString("en-US")}
			</p>
			<p>Status: {status}</p>
		</div>
	);
};

export default Info;
