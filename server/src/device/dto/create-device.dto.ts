import { ObjectId } from "mongoose";

export class CreateDeviceDto {
	readonly name: string;
	readonly price: number;
	readonly discount: number;
	readonly screenDiagonal: string;
  readonly screenRefreshRate: string;
  readonly batteryCapacity: string;
  readonly сonnection: string;
  readonly size: string;
  readonly weight: string;
  readonly color: string;
  readonly otherDescr: string;
  readonly countryProductManufacturer: string;
	readonly brandId: ObjectId;
	readonly typeId: ObjectId;
}