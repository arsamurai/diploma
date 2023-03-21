import { ObjectId } from "mongoose";

export class SetDeviceDto {
	readonly userId: ObjectId;
	readonly deviceId: ObjectId;
}