import { basketApi } from './../../../API/basket';
import { Dispatch } from "@reduxjs/toolkit";
import { ordersApi } from "../../../API/order";
import { setIsError, setIsLoading, setIsReady } from "../app/slice";
import { setOrders } from "./slice";
import { setBasket } from '../basket/slice';

export const OrderActionCreators = {
	fetchOrders: () => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const orders = await ordersApi.getOrders();
			dispatch(setOrders(orders));
		} catch (e: any) {
      dispatch(setIsError(e));
    } finally {
      dispatch(setIsReady());
    }
	},
	makeOrder: (userId: Object) => async (dispatch: Dispatch) => {
		try {
			await ordersApi.makeOrder(userId);
			const devices = await basketApi.getAllDevices(userId);
			dispatch(setBasket(devices));
		} catch(e) {
			console.log(e);
		}
	}
}