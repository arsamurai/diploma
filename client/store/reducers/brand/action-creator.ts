import { Dispatch } from "@reduxjs/toolkit";
import { brandsApi } from "../../../API/brands";
import { IBrand } from "../../../models/IBrand";
import { setIsError, setIsLoading, setIsReady } from "../app/slice";
import { setBrands } from "./slice";

export const BrandActionCreators = {
	fetchBrands: () => async (dispatch: Dispatch) => {
		try {
			dispatch(setIsLoading());
			const brands = await brandsApi.getAllBrands();
			dispatch(setBrands(brands));
		} catch(e: any) {
      dispatch(setIsError(e));
		} finally {
			dispatch(setIsReady());
		}
	},
	createBrand: (data: IBrand) => async (dispatch: Dispatch) => {
		try {
			await brandsApi.createBrand(data);
		} catch(e) {
			console.log(e);
		}
	},
	deleteBrand: (brandId: Object) => async (dispatch: Dispatch) => {
		try {
			const brands = await brandsApi.deleteBrand(brandId);
			dispatch(setBrands(brands));
		} catch(e) {
			console.log(e);
		}
	}
}