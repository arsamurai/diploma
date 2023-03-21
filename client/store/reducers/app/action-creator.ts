import { Dispatch } from "@reduxjs/toolkit";
import { devicesApi } from "../../../API/devices";
import { setIsError, setIsLoading, setIsReady, setSearchResults } from "../app/slice";

export const AppActionCreators = {
	search: (query: string) => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const searchItems = await devicesApi.searchDevices(query);
			dispatch(setSearchResults(searchItems));
		} catch(e: any) {
      dispatch(setIsError(e));
		} finally {
			dispatch(setIsReady());
		}
	}
}