import classes from "../Components/profile.module.css";
import { useParams } from "react-router-dom";
import Info from "../Components/Info";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
	const params = useParams();
	const username = params.username;
	const users = useSelector((state) => state.users);
	const [info, setInfo] = useState([]);

	useEffect(() => {
		document.title = `Profile | ${username}`;
		const data = users.filter((user) => username === user.username)[0].info;
		setInfo(data);
		return () => {
			setInfo([]);
		};
	}, [users, username]);

	return (
		<main className={classes.container}>
			<div className={classes.information}>
				<h2>{username.toUpperCase()}</h2>
				{info.map((data) => (
					<Info data={data} key={data.checkInDate} name={username} />
				))}
			</div>
		</main>
	);
};

export default Profile;
