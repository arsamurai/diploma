import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DeviceInfo, DeviceInfoSchema } from './schemas/device-info.schema';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { FileService } from 'src/file/file.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeService } from '../type/type.service';
import { BrandService } from '../brand/brand.service';
import { Type, TypeSchema } from '../type/schemas/type.schema';
import { Brand, BrandSchema } from '../brand/schemas/brand.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{name: Device.name, schema: DeviceSchema}]),
		MongooseModule.forFeature([{name: DeviceInfo.name, schema: DeviceInfoSchema}]),
		MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
		MongooseModule.forFeature([{name: Type.name, schema: TypeSchema}]),
		MongooseModule.forFeature([{name: Brand.name, schema: BrandSchema}]),
		JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  controllers: [DeviceController],
  providers: [DeviceService, FileService, TypeService, BrandService],
	exports: [
    DeviceService,
		JwtModule
  ]
})
export class DeviceModule {}
