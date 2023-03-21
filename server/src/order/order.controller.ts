import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
	UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { OrderService } from './order.service';
import { ObjectId } from 'mongoose';

@Controller('/order')
export class OrderController {
  constructor(private orderService: OrderService) {}

	@Roles('USER')
	@UseGuards(RolesGuard)
  @Post('/:id')
  makeOrder(@Param('id') user: ObjectId) {
    return this.orderService.makeOrder(user);
  }

	@Roles('USER')
	@UseGuards(RolesGuard)
	@Get()
	getOrders() {
		return this.orderService.getOrders();
	}
}
