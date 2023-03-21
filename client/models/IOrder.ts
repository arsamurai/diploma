import { IDevice } from "./IDevice";
import { IUser } from "./IUser";

export interface IOrder {
	_id: any;
  user: IUser;
  devices: OrderDevice[] | [];
}

interface OrderDevice {
	_id: any,
	count: number,
	device: IDevice,
	basket: any
}