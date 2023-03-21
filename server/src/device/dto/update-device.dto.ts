import { ObjectId } from "mongoose";
import { CreateDeviceDto } from "./create-device.dto";

export class UpdateDeviceDto extends CreateDeviceDto {
	readonly id: ObjectId
}