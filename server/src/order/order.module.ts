import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schemas/order.schema';
import { BasketService } from './../basket/basket.service';
import { Basket, BasketSchema } from './../basket/schemas/basket.schema';
import { BasketItem, BasketItemSchema } from 'src/basket/schemas/basketItem.schema';
import { Device, DeviceSchema } from 'src/device/schemas/device.schema';
import { UserService } from 'src/users/user.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { FileService } from 'src/file/file.service';
import { RolesService } from 'src/roles/roles.service';
import { Role, RoleSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
		MongooseModule.forFeature([{name: Basket.name, schema: BasketSchema}]),
		MongooseModule.forFeature([{name: BasketItem.name, schema: BasketItemSchema}]),
		MongooseModule.forFeature([{name: Device.name, schema: DeviceSchema}]),
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
		JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  controllers: [OrderController],
  providers: [OrderService, BasketService, UserService, FileService, RolesService],
	exports: [
    OrderService,
		JwtModule
  ]
})
export class OrderModule {}
