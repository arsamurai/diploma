import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceInfoDocument = DeviceInfo & Document;

@Schema()
export class DeviceInfo {
  @Prop()
  screenDiagonal: string;

	@Prop()
  screenRefreshRate: string;

  @Prop()
  batteryCapacity: string;

  @Prop()
  сonnection: string;

	@Prop()
  size: string;

  @Prop()
  weight: string;

  @Prop()
  color: string;

  @Prop()
  otherDescr: string;

  @Prop()
  countryProductManufacturer: string;
}

export const DeviceInfoSchema = SchemaFactory.createForClass(DeviceInfo);
