import { ApiCall } from "./api";
import { AddRolesValues } from "../models/IRole";
import { ILoginValues, IRegistrationValues, IUpdateValues } from "../models/IUser";

export const userApi = {
	registration: async (data: IRegistrationValues) => {
		return ApiCall('post', 'user/registration', data);
	},
	login: async (data: ILoginValues) => {
		return ApiCall('post', 'user/login', data);
	},
	auth: async () => {
		return ApiCall('get', 'user/auth');
	},
	uploadAvatar: async (avatar: Blob) => {
		const formData = new FormData();
		formData.append("avatar", avatar);
		return ApiCall('post', 'user/avatar', formData);
	},
	deleteAvatar: async () => {
		return ApiCall('delete', 'user/avatar');
	},
	getAllUsers: async (count = 10, offset = 0) => {
		return ApiCall('get', `user?count=${count}&offset=${offset}`);
	},
	addRole: async (data: AddRolesValues) => {
		return ApiCall('post', 'user/role', data);
	},
	update: async (data: IUpdateValues) => {
		return ApiCall('put', 'user/update', data);
	},
}