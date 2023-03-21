import { IBrand } from "../models/IBrand";
import { ApiCall } from "./api";

export const brandsApi = {
	createBrand: async (data: IBrand) => {
		return ApiCall('post', 'brands', data);
	},
	deleteBrand: async (brandId: Object) => {
		return ApiCall('delete', `brands?id=${brandId}`);
	},
  getAllBrands: async () => {
    return ApiCall('get', 'brands/all');
  },
	getAllBrandsByType: async (type: string) => {
    return ApiCall('get', `brands?type=${type}`);
  }
}