import { appReducer } from './app/slice';
import { basketReducer } from './basket/slice';
import { brandsReducer } from './brand/slice';
import { devicesReducer } from './devices/slice';
import { ordersReducer } from './order/slice';
import { rolesReducer } from './role/slice';
import { typesReducer } from './type/slice';
import { userReducer } from './user/slice';
import { usersReducer } from './users/slice';
import { filtersReducer } from './filters/slice';
import { deviceReducer } from './device/slice';

export default {
	[brandsReducer.name]: brandsReducer.reducer,
	[typesReducer.name]: typesReducer.reducer,
	[rolesReducer.name]: rolesReducer.reducer,
	[ordersReducer.name]: ordersReducer.reducer,
	[appReducer.name]: appReducer.reducer,
	[usersReducer.name]: usersReducer.reducer,
	[userReducer.name]: userReducer.reducer,
	[basketReducer.name]: basketReducer.reducer,
	[devicesReducer.name]: devicesReducer.reducer,
	[deviceReducer.name]: deviceReducer.reducer,
	[filtersReducer.name]: filtersReducer.reducer,
};