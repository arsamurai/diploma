import { ApiCall } from "./api";
import { IRole } from "../models/IRole";

export const rolesApi = {
	getAllRoles: async () => {
		return ApiCall('get', 'roles');
	},
	createRole: async (data: IRole) => {
		return ApiCall('post', 'roles', data);
	},
}