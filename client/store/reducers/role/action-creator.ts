import { Dispatch } from "@reduxjs/toolkit";
import { rolesApi } from "../../../API/roles";
import { IRole } from "../../../models/IRole";
import { setIsError, setIsLoading, setIsReady } from "../app/slice";
import { setRoles } from "./slice";

export const RoleActionCreators = {
  fetchRoles: () => async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading());
      const roles = await rolesApi.getAllRoles();
      dispatch(setRoles(roles));
    } catch (e: any) {
      dispatch(setIsError(e));
    } finally {
      dispatch(setIsReady());
    }
  },
  createRole: (data: IRole) => async (dispatch: Dispatch) => {
    try {
      const roles = await rolesApi.createRole(data);
      dispatch(setRoles(roles));
    } catch (e) {
      console.log(e);
    }
  },
};
