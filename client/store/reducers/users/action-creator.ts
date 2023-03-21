import { Dispatch } from "@reduxjs/toolkit";
import { userApi } from "../../../API/user";
import { setIsError } from "../app/slice";
import { setIsLoading, setIsReady } from "./slice";
import { setUsers } from "./slice";

export const UsersActionCreators = {
	fetchUsers: (count?: number, offset?: number) => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const users = await userApi.getAllUsers(count, offset);
			dispatch(setUsers(users));
		} catch(e: any) {
      dispatch(setIsError(e));
		} finally {
			dispatch(setIsReady());
		}
	}
}