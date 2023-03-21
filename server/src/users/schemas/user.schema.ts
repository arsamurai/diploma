import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../roles/schemas/roles.schema';
import { BasketItem } from 'src/basket/schemas/basketItem.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
	@Prop()
  id: string; 

	@Prop()
  login: string; 

	@Prop()
  name: string; 

	@Prop()
  surname: string; 

	@Prop()
  byFather: string; 

	@Prop({unique: true})
  email: string;

	@Prop({unique: true})
  phoneNumber: string;

	@Prop()
  imgPath: string;

	@Prop()
  password: string;

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]})
  roles: Role[];

	@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'BasketItem' }]})
  history: BasketItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);