import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Device} from "./device.schema";
import * as mongoose from 'mongoose'

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    username: string;

    @Prop()
    dignity: string;

    @Prop()
    limitations: string;

    @Prop()
    text: string;

    @Prop()
    stars: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Device'})
    deviceId: Device;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);