import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IBrand } from "../../../models/IBrand";
import { IFiltersState, ISort } from "./types";

const initialState: IFiltersState = {
	brands: [] as IBrand[],
	byBrand: {} as IBrand,
  sortBy: {
		name: 'Популярністю',
    value: "rating",
    order: "desc",
  },
	offset: 0
};

export const filtersReducer = createSlice({
  name: "filters",
  initialState,
  reducers: {
		setFilterBrands(state, action: PayloadAction<IBrand[]>) {
      state.brands = action.payload
    },
		setByBrand(state, action: PayloadAction<IBrand>) {
      state.byBrand = action.payload
    },
    setSortBy(state, action: PayloadAction<ISort>) {
      state.sortBy = action.payload
    },
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.filters,
			};
		},
	},
});

export const { setFilterBrands, setByBrand, setSortBy, setOffset } = filtersReducer.actions;
export default filtersReducer.reducer;
