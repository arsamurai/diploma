import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IBrand } from "../../../models/IBrand";
import { IBrandState } from "./types";

const initialState: IBrandState = {
  brands: [] as IBrand[]
};

export const brandsReducer = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setBrands(state, action: PayloadAction<IBrand[]>) {
      state.brands = action.payload;
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.brands,
			};
		},
	},
});

export const { setBrands } = brandsReducer.actions;
export default brandsReducer.reducer;
