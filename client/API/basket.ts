import { AddDevice, SetDevice } from "../models/IBasket";
import { ApiCall } from "./api";

export const basketApi = {
	addDevice: async (data: AddDevice) => {
		return ApiCall('post', 'basket', data);
	},
	removeDevice: async (data: SetDevice) => {
		return ApiCall('delete', 'basket', data);
	},
	plusDevice: async (data: SetDevice) => {
		return ApiCall('post', 'basket/plus', data);
	},
	minusDevice: async (data: SetDevice) => {
		return ApiCall('post', 'basket/minus', data);
	},
  getAllDevices: async (userId: Object) => {
    return ApiCall('get', 'basket', userId);
  }
}