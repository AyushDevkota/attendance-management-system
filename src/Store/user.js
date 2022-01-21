import { createSlice } from "@reduxjs/toolkit";
import { checkSameDay } from "../Helper";

const userSlice = createSlice({
	name: "users",
	initialState: [
		{
			username: "test",
			password: "test",
			info: [],
			loggedIn: false,
		},
		{
			username: "admin",
			password: "admin",
			info: [],
			loggedIn: false,
		},
	],
	reducers: {
		checkIn(state, action) {
			const index = state.findIndex(
				(user) => user.username === action.payload.username
			);
			state[index].info = [
				...state[index].info,
				{
					checkInRemarks: action.payload.remarks,
					checkOutRemarks: "",
					checkedIn: true,
					checkedOut: false,
					checkInDate: action.payload.date,
					checkOutDate: null,
				},
			];
		},

		checkOut(state, action) {
			const userIndex = state.findIndex(
				(user) => user.username === action.payload.username
			);
			const infoIndex = state[userIndex].info.findIndex((detail) =>
				checkSameDay(detail.checkInDate, action.payload.date)
			);
			state[userIndex].info[infoIndex] = {
				checkInRemarks: state[userIndex].info[infoIndex].checkInRemarks,
				checkOutRemarks: action.payload.remarks,
				checkedIn: state[userIndex].info[infoIndex].checkedIn,
				checkedOut: true,
				checkInDate: state[userIndex].info[infoIndex].checkInDate,
				checkOutDate: action.payload.date,
			};
		},

		login(state, action) {
			const index = state.findIndex((user) => user.username === action.payload);
			state[index].loggedIn = true;
		},

		delete(state, action) {
			const userIndex = state.findIndex(
				(user) => user.username === action.payload.username
			);
			const infoIndex = state[userIndex].info.findIndex(
				(detail) => detail.checkInDate === action.payload.date
			);
			state[userIndex].info.splice(infoIndex, 1);
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
