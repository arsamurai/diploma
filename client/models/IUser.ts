import { IBasketItem } from "../store/reducers/basket/types";
import { IRole } from "./IRole";

export interface ILoginValues {
	login: string,
	password: string
}

export interface IRegistrationValues extends ILoginValues {
	email: string,
	confirmPassword: string,
  name: string;
  surname: string;
  byFather: string;
  phoneNumber: string;
}

export interface IUser {
	_id: any,
  login: string;
  name: string;
  surname: string;
  byFather: string;
  email: string;
  phoneNumber: string;
  imgPath: Blob | null;
  roles: IRole[] | [];
  history: IBasketItem[] | [];
}
export interface IUpdateValues {
	id: any,
	email: string,
  name: string;
  surname: string;
  byFather: string;
  phoneNumber: string;	
}