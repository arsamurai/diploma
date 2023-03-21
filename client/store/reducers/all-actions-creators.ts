import { AppActionCreators } from "./app/action-creator";
import { BasketActionCreators } from "./basket/action-creator";
import { BrandActionCreators } from "./brand/action-creator";
import { DeviceActionCreators } from "./device/action-creator";
import { DevicesActionCreators } from "./devices/action-creator";
import { FiltersActionCreators } from "./filters/action-creator";
import { OrderActionCreators } from "./order/action-creator";
import { TypeActionCreators } from "./type/action-creator";
import { UserActionCreators } from "./user/action-creator";
import { UsersActionCreators } from "./users/action-creator";

export const allActionCreators = {
	...AppActionCreators,
	...BasketActionCreators,
	...BrandActionCreators,
	...TypeActionCreators,
	...DevicesActionCreators,
	...DeviceActionCreators,
	...OrderActionCreators,
	...UserActionCreators,
	...UsersActionCreators,
	...FiltersActionCreators
}