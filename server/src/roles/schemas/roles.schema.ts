
import {User} from "../../users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose'

export type RoleDocument = Role & Document;

@Schema()
export class Role {
    @Prop({unique: true, allowNull: false})
    value: string;

    @Prop({allowNull: false})
    description: string;

		@Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]})
    users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);