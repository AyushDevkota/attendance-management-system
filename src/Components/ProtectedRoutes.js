import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
	const user = useSelector((state) => state.users);
	const params = useParams();
	const username = params.username;
	const isAuth = user.filter((item) => item.username === username)[0].loggedIn;
	return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
