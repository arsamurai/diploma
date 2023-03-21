import { IDevice } from "../../../models/IDevice";

export interface IDeviceState {
	device: IDevice,
	recsTypes: IDevice[],
	recsBrands: IDevice[],
	isLoading: boolean
}