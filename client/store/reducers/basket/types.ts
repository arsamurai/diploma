import { IDevice } from "../../../models/IDevice";

export interface IBasketState {
	basket: IBasketAction,
	isLoading: boolean
}

export interface IBasketItem {
	device: IDevice;
	count: number
}

export interface IBasketAction {
	user: string,
	devices: IBasketItem[]
}