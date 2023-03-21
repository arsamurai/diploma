import { Dispatch } from "@reduxjs/toolkit";
import { devicesApi } from "../../../API/devices";
import { setIsError } from "../app/slice";
import { setIsLoading, setIsReady, setRecsBrands, setRecsTypes } from "./slice";
import { setDevice } from "./slice";

export const DeviceActionCreators = {
	fetchDevice: (id: any) => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const devices = await devicesApi.getOne(id);
			const typeRecs = await devicesApi.getRecommendations(devices.typeId.value);
			const brandRecs = await devicesApi.getRecommendations(undefined, devices.brandId.value);
			dispatch(setDevice(devices));
			dispatch(setRecsTypes(typeRecs));
			dispatch(setRecsBrands(brandRecs));
		} catch(e: any) {
      dispatch(setIsError(e));
		} finally {
			dispatch(setIsReady());
		}
	},
}
      