import { BasketItem } from 'src/basket/schemas/basketItem.schema';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'BasketItem' }]})
  devices: BasketItem[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);