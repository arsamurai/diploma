import { Dispatch } from "@reduxjs/toolkit";
import { basketApi } from "../../../API/basket";
import { AddDevice, SetDevice } from "../../../models/IBasket";
import { setIsError } from "../app/slice";
import { setBasket, setIsLoading, setIsReady } from "./slice";

export const BasketActionCreators = {
  // getBasket: (userId: Object) => async (dispatch: Dispatch) => {
  //   try {
  //     const devices = await basketApi.getAllDevices(userId);
  //     dispatch(setIsLoading());
  //     dispatch(setBasket(devices));
  //   } catch (e: any) {
  //     dispatch(setIsError(e));
  //   } finally {
  //     dispatch(setIsReady());
  //   }
  // },
  addDevice: (data: AddDevice) => async (dispatch: Dispatch) => {
		try {
      const devices = await basketApi.addDevice(data);
    	dispatch(setBasket(devices));
    } catch (e: any) {
      dispatch(setIsError(e));
    } 
  },
  removeDevice: (data: SetDevice) => async (dispatch: Dispatch) => {
		try {
      const devices = await basketApi.removeDevice(data);
    	dispatch(setBasket(devices));
    } catch (e: any) {
      dispatch(setIsError(e));
    } 
  },
  plusDevice: (data: SetDevice) => async (dispatch: Dispatch) => {
		try {
      const devices = await basketApi.plusDevice(data);
    	dispatch(setBasket(devices));
    } catch (e: any) {
      dispatch(setIsError(e));
    } 
  },
  minusDevice: (data: SetDevice) => async (dispatch: Dispatch) => {
		try {
      const devices = await basketApi.minusDevice(data);
    	dispatch(setBasket(devices));
    } catch (e: any) {
      dispatch(setIsError(e));
    } 
  },
};
