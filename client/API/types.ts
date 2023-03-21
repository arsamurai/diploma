import { IType } from "../models/IType";
import { ApiCall } from "./api";

export const typesApi = {
	createType: async (data: IType) => {
		return ApiCall('post', 'types', data);
	},
	deleteType: async (typeId: Object) => {
		return ApiCall('delete', `types?id=${typeId}`);
	},
  getAllTypes: async () => {
    return ApiCall('get', 'types');
  }
}