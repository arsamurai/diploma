import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Device } from '../../device/schemas/device.schema';
import { User } from '../../users/schemas/user.schema';
import { Basket } from './basket.schema';

export type BasketItemDocument = BasketItem & Document;

@Schema()
export class BasketItem {

	@Prop({default: 1})
  count: number;

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Device'})
  device: Device

	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Basket'})
  basket: Basket;
}

export const BasketItemSchema = SchemaFactory.createForClass(BasketItem);