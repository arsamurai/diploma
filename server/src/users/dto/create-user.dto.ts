export class CreateUserDto {
	readonly login: string;
	readonly name: string;
	readonly surname: string;
	readonly byFather: string;
	readonly email: string;
	readonly phoneNumber: string;
	readonly password: string;
}