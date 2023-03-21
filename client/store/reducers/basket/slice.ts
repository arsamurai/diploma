import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IDevice } from "../../../models/IDevice";
import { IBasketAction, IBasketState } from "./types";

const initialState: IBasketState = {
  basket: {} as IBasketAction,
  isLoading: true,
};

export const basketReducer = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket(state, action: PayloadAction<IBasketAction>) {
      state.basket = action.payload;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },
    setIsReady(state) {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.basket,
      };
    },
  },
});

export const { setBasket, setIsLoading, setIsReady } = basketReducer.actions;
export default basketReducer.reducer;
