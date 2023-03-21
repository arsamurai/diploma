import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypeDocument = Type & Document;

@Schema()
export class Type {
	@Prop({ unique: true })
  name: string;

	@Prop({ unique: true })
	value: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);
