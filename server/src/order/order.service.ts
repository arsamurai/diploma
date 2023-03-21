import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { BasketService } from 'src/basket/basket.service';
import { UserService } from 'src/users/user.service';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private basketService: BasketService,
    private userService: UserService,
  ) {}

	async makeOrder(user: ObjectId) {
		const basket = await this.basketService.getDevices(user);
		const order = await this.orderModel.create({user, devices: basket.devices});
		await this.userService.addDeviceInHistory({userId: user, devices: basket.devices});
		await this.basketService.clearBasket(user);
    return order;
  }
	
	async getOrders() {
    const orders = await this.orderModel.find().populate("user").populate({ path: "devices", populate: "device" })
    return orders;
  }

}
