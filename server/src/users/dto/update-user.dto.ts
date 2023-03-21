import { ObjectId } from "mongoose";

export class UpdateUserDto {
	readonly id: ObjectId;
	readonly name: string;
	readonly surname: string;
	readonly byFather: string;
	readonly email: string;
	readonly phoneNumber: string;
}