import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/index";
import Profile from "./Pages/Profile";
import NoMatch from "./Pages/NoMatch";
import ProtectedRoutes from "./Components/ProtectedRoutes";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="profile/:username" element={<Profile />} />
				</Route>
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
