import { ApiCall } from "./api";

export const ordersApi = {
	makeOrder: async (userId: Object) => {
		return ApiCall('post', `order/${userId}`);
	},
  getOrders: async () => {
    return ApiCall('get', 'order');
  }
}