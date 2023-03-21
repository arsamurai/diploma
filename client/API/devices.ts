import { CreateComment, GetRecs } from "../models/IDevice";
import { ISort } from "../store/reducers/filters/types";
import { ApiCall } from "./api";

export const devicesApi = {
	createDevice: (avatar: Blob, data: any) => {
		const formData = new FormData();
		formData.append('name', data.name)
		formData.append('price', String(data.price))
		formData.append('brandId', String(data.brandId))
		formData.append('typeId', String(data.typeId))
		formData.append("image", avatar);
		data.discount && formData.append('discount', String(data.discount))
		data.color && formData.append('color', data.color)
		data.batteryCapacity && formData.append('batteryCapacity', data.batteryCapacity)
		data.countryProductManufacturer && formData.append('countryProductManufacturer', data.countryProductManufacturer)
		data.otherDescr && formData.append('otherDescr', data.otherDescr)
		data.screenDiagonal && formData.append('screenDiagonal', data.screenDiagonal)
		data.screenRefreshRate && formData.append('screenRefreshRate', data.screenRefreshRate)
		data.size && formData.append('size', data.size)
		data.weight && formData.append('weight', data.weight)
		data.сonnection && formData.append('сonnection', data.сonnection)
		return ApiCall('post', 'devices', formData);
	},
	deleteDevice: async (deviceId: Object) => {
		return ApiCall("delete", `devices?id=${deviceId}`);
	},
	getAllDevices: async (count = 30, offset = 0) => {
    return ApiCall("get", `devices/all?count=${count}&offset=${offset}`);
  },
	getByTypeAndBrand: async (type: string, brand: string, sort: ISort, offset = 0) => {
    return ApiCall("get", `devices?type=${type}&brand=${brand}&sort=${sort.value}&order=${sort.order}&offset=${offset}`);
  },
	getDevicesByType: async (value: string, count?: number) => {
    return ApiCall("get", `devices/type?value=${value}&count=${count}`);
  },
	getDevicesByBrand: async (value: string, count?: number) => {
    return ApiCall("get", `devices/brand?value=${value}&count=${count}`);
  },
	getDevicesByDiscount: async (count?: number) => {
    return ApiCall("get", `devices/discount?count=${count}`);
  },
	getPopular: async (count?: number) => {
		return ApiCall("get", `devices/rating?count=${count}`);
	},
  searchDevices: async (query: string) => {
    return ApiCall("get", `devices/search?query=${query}`);
  },
	getOne: async (deviceId: any) => {
    return ApiCall("get",  `devices/${deviceId}`);
  },
	getRecommendations: async (type?: string | undefined, brand?: string | undefined) => {
		const query = `${type ? `type=${type}` : ''}${brand ? `brand=${brand}` : ''}`;
		console.log(query);
    return ApiCall("get",  `devices/recommendations?${query}`);
  },
	addComment: async (data: CreateComment) => {
    return ApiCall("post",  'devices/comment', data);
  },
}