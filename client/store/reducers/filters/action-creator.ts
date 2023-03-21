import { Dispatch } from "@reduxjs/toolkit";
import { brandsApi } from "../../../API/brands";
import { IBrand } from "../../../models/IBrand";
import { setIsError, setIsLoading, setIsReady } from "../app/slice";
import { setOffset, setByBrand, setFilterBrands, setSortBy } from "./slice";
import { ISort } from "./types";

export const FiltersActionCreators = {
  fetchFilterBrands: (type: string) => async (dispatch: Dispatch) => {
    try {
			const brands= await brandsApi.getAllBrandsByType(type);
			dispatch(setFilterBrands(brands))
			dispatch(setByBrand(brands[0]))
    } catch (e: any) {
      dispatch(setIsError(e));
    }
  },
  setByBrand: (brand: IBrand) => async (dispatch: Dispatch) => {
    try {
      dispatch(setByBrand(brand));
    } catch (e: any) {
      dispatch(setIsError(e));
    }
  },
	setSortBy: (sort: ISort) => async (dispatch: Dispatch) => {
    try {
      dispatch(setSortBy(sort));
    } catch (e: any) {
      dispatch(setIsError(e));
    }
  },
	setOffset: (offset: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(setOffset(offset));
    } catch (e: any) {
      dispatch(setIsError(e));
    }
  },
};
