import { IDevice } from "../../../models/IDevice";

export interface IDevicesState {
	allDevices: IDevice[],
	devices: IDevice[],
	count: number,
	isLoading: boolean
}