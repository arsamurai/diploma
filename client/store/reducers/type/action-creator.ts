import { Dispatch } from "@reduxjs/toolkit";
import { typesApi } from "../../../API/types";
import { IType } from "../../../models/IType";
import { setIsError, setIsLoading, setIsReady } from "../app/slice";
import { setTypes } from "./slice";

export const TypeActionCreators = {
	fetchTypes: () => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const types = await typesApi.getAllTypes();
			dispatch(setTypes(types));
		} catch (e: any) {
      dispatch(setIsError(e));
    } finally {
      dispatch(setIsReady());
    }
	},
	createType: (data: IType) => async (dispatch: Dispatch) => {
		try {
			await typesApi.createType(data);
		} catch(e) {
			console.log(e);
		}
	},
	deleteType: (typeId: Object) => async (dispatch: Dispatch) => {
		try {
			const types = await typesApi.deleteType(typeId);
			dispatch(setTypes(types));
		} catch(e) {
			console.log(e);
		}
	}
}