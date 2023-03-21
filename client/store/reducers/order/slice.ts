import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IOrder } from "../../../models/IOrder";
import { IOrderState } from "./types";


const initialState: IOrderState = {
  orders: [] as IOrder[]
};

export const ordersReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<IOrder[]>) {
      state.orders = action.payload;
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.orders,
			};
		},
	},
});

export const { setOrders } = ordersReducer.actions;
export default ordersReducer.reducer;
