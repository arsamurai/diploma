import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DeviceInfo } from './device-info.schema';
import { Comment } from './comment.schema';
import { Brand } from 'src/brand/schemas/brand.schema';
import { Type } from 'src/type/schemas/type.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {

  @Prop()
  name: string;

  @Prop()
  price: number;

	@Prop()
  discount: number;
	
  @Prop({default: 0})
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brandId: Brand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Type' })
  typeId: Type;

  @Prop()
  imgPath: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DeviceInfo' })
  info: DeviceInfo;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
