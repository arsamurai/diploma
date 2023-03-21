import { Dispatch } from "@reduxjs/toolkit";
import { devicesApi } from "../../../API/devices";
import { setIsError } from "../app/slice";
import { ISort } from "../filters/types";
import { setAllDevices, setCount, setIsLoading, setIsReady } from "./slice";
import { setDevices } from "./slice";

export const DevicesActionCreators = {
	fetchAllDevices: (count?: number, offset?: number) => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const devices = await devicesApi.getAllDevices(count, offset);
			dispatch(setAllDevices(devices));
		} catch(e: any) {
      dispatch(setIsError(e));
		} finally {
			dispatch(setIsReady());
		}
	},
	fetchDevices: (type: string, brand: string, sort: ISort, offset?: number) => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const devices = await devicesApi.getByTypeAndBrand(type, brand, sort, offset);
			dispatch(setDevices(devices.devices));
			dispatch(setCount(devices.count));
		} catch(e: any) {
      dispatch(setIsError(e));
		} finally {
			dispatch(setIsReady());
		}
	},
	createDevice: (avatar: Blob, data: any) => async (dispatch: Dispatch) => {
		try {
			const devices = await devicesApi.createDevice(avatar, data);
			dispatch(setDevices(devices));
		} catch(e: any) {
      dispatch(setIsError(e));
		}
	},
	deleteDevice: (deviceId: Object) => async (dispatch: Dispatch) => {
		try {
			const devices = await devicesApi.deleteDevice(deviceId);
			dispatch(setDevices(devices));
		} catch(e: any) {
      dispatch(setIsError(e));
		}
	},



	// Поки так залишити, але буде працювати по-іншому !!!

	// searchDevice: (query: string) => async (dispatch: Dispatch) => {
	// 	try {
	// 		dispatch(setIsLoading());
	// 		const response = await devicesApi.searchDevices(query);
	// 		dispatch(setDevices(response.data));
	// 	} catch (e: any) {
	// 		dispatch(setIsError(e));
	// 	} finally {
	// 		dispatch(setIsReady());
	// 	}
	// }
}