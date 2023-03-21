import { Dispatch } from "@reduxjs/toolkit";
import { devicesApi } from "../../../API/devices";
import { userApi } from "../../../API/user";
import { IComment } from "../../../models/IDevice";
import { AddRolesValues } from "../../../models/IRole";
import { ILoginValues, IRegistrationValues, IUpdateValues, IUser } from "../../../models/IUser";
import { setIsError } from "../app/slice";
import { setBasket } from "../basket/slice";
import { setUser, setIsLoading, setIsReady, setIsAuth } from "./slice";

export const UserActionCreators = {
	registration: (data: IRegistrationValues) => async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading());
      const user = await userApi.registration(data);
      dispatch(setUser(user));
      dispatch(setIsAuth(true));
    } catch (e: any) {
      dispatch(setIsError(e));
    } finally {
      dispatch(setIsReady());
    }
  },
  login: (data: ILoginValues) => async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading());
      const response = await userApi.login(data);
			localStorage.setItem("token", response.token);
      dispatch(setUser(response.user));
      dispatch(setBasket(response.basket));
      dispatch(setIsAuth(true));
    } catch (e: any) {
      dispatch(setIsError(e));
    } finally {
      dispatch(setIsReady());
    }
  },
	logout: () => async (dispatch: Dispatch) => { 
    dispatch(setUser({} as IUser));
    dispatch(setIsAuth(false));
		localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
	auth: () => async (dispatch: Dispatch) => {
		try {
			const response = await userApi.auth();
			localStorage.setItem("token", response.token);
			dispatch(setUser(response.user));
      dispatch(setBasket(response.basket));
      dispatch(setIsAuth(true));
		} catch (e: any) {
			localStorage.removeItem("token")
			dispatch(setIsError(e));
		}
	},
	addRole: (data: AddRolesValues) => async (dispatch: Dispatch) => {
		try {
      const user = await userApi.addRole(data);
      dispatch(setUser(user));
    } catch (e: any) {
      dispatch(setIsError(e));
    }
	},
	updateUser: (data: IUpdateValues) => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
      const user = await userApi.update(data);
      dispatch(setUser(user));
    } catch (e: any) {
      dispatch(setIsError(e));
    } finally {
      dispatch(setIsReady());
    }
	},
	uploadAvatarReducer: (avatar: Blob) => async (dispatch: Dispatch) => {
		try {
			const user = await userApi.uploadAvatar(avatar);
			dispatch(setUser(user));
		} catch (e: any) {
			dispatch(setIsError(e));
		}
	},
	deleteAvatarReducer: () => async (dispatch: Dispatch) => {
		try {
			const user = await userApi.deleteAvatar();
			dispatch(setUser(user));
		} catch (e: any) {
			dispatch(setIsError(e));
		}
	}
};
