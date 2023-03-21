import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IUser } from "../../../models/IUser";
import { IUserState } from "./types";

const initialState: IUserState = {
	user: {} as IUser,
	isAuth: false,
  isLoading: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
		setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    setIsReady(state) {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { setUser, setIsAuth, setIsLoading, setIsReady } =
  userReducer.actions;
export default userReducer.reducer;
