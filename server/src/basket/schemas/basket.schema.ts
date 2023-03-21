import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Device } from '../../device/schemas/device.schema';
import { User } from '../../users/schemas/user.schema';
import { BasketItem } from './basketItem.schema';

export type BasketDocument = Basket & Document;

@Schema()
export class Basket {
	@Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'BasketItem'}]})
  devices: BasketItem[];
}

export const BasketSchema = SchemaFactory.createForClass(Basket);