import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceService } from 'src/device/device.service';
import { Comment, CommentSchema } from 'src/device/schemas/comment.schema';
import { DeviceInfo, DeviceInfoSchema } from 'src/device/schemas/device-info.schema';
import { Device, DeviceSchema } from 'src/device/schemas/device.schema';
import { FileService } from 'src/file/file.service';
import { Type, TypeSchema } from 'src/type/schemas/type.schema';
import { TypeService } from 'src/type/type.service';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand, BrandSchema } from './schemas/brand.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{name: Brand.name, schema: BrandSchema}]),
		MongooseModule.forFeature([{name: Device.name, schema: DeviceSchema}]),
		MongooseModule.forFeature([{name: DeviceInfo.name, schema: DeviceInfoSchema}]),
		MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
		MongooseModule.forFeature([{name: Type.name, schema: TypeSchema}]),
		JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  controllers: [BrandController],
  providers: [BrandService, DeviceService, TypeService, FileService],
	exports: [
    BrandService,
		JwtModule
  ]
})
export class BrandModule {}
