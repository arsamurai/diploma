import { IDevice } from "../../../models/IDevice";
import { IUser } from "../../../models/IUser";

export interface IUserState {
	user: IUser,
	isLoading: boolean,
	isAuth: boolean,
}