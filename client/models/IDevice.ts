import { IBrand } from "./IBrand";
import { IType } from "./IType";

export interface GetRecs {
  typeId?: any,
  brandId?: any,
	count?: number
}

export interface IDevice {
	_id: any;
	name: string;
  price: number;
  rating: number;
  discount?: number;
  brandId: IBrand;
  typeId: IType;
  info: IDeviceInfo;
  imgPath: string;
  comments: IComment[];
}

export interface IDeviceInfo {
	screenDiagonal?: string;
	screenRefreshRate?: string;
	batteryCapacity?: string;
	сonnection?: string;
	color?: string;
	size?: string;
	weight?: string;
	otherDescr?: string;
	countryProductManufacturer?: string;
}

export interface CreateComment {
	username: string;
  dignity: string;
  limitations: string;
  text: string;
  stars: number;
  deviceId: number;	
}

export interface IComment extends CreateComment {
	_id: number | null;
}
