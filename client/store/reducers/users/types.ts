import { IDevice } from "../../../models/IDevice";
import { IUser } from "../../../models/IUser";

export interface IUsersState {
	users: IUser[],
	isLoading: boolean
}