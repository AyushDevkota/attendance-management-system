import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import loginReducer from "./login";

const store = configureStore({
	reducer: {
		users: userReducer,
		login: loginReducer,
	},
});

export default store;
