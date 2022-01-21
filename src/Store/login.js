import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
	name: "login",
	initialState: {
		username: "",
		password: "",
	},
	reducers: {
		updateUsername(state, action) {
			state.username = action.payload;
		},
		updatePassword(state, action) {
			state.password = action.payload;
		},
	},
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
