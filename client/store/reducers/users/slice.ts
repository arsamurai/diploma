import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IUser } from "../../../models/IUser";
import { IUsersState } from "./types";

const initialState: IUsersState = {
  users: [] as IUser[],
	isLoading: true
};  

export const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
		setIsLoading(state) {
      state.isLoading = true
    },
    setIsReady(state) {
      state.isLoading = false
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.users,
			};
		},
	},
});

export const { setUsers, setIsLoading, setIsReady } = usersReducer.actions;
export default usersReducer.reducer;
