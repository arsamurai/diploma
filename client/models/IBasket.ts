export interface SetDevice {
	userId: Object;
	deviceId: Object;
}

export interface AddDevice extends SetDevice {
	count?: number;
}