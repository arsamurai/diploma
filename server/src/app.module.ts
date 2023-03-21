import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { DeviceModule } from './device/device.module';
import { FileModule } from './file/file.module';
import { BrandModule } from './brand/brand.module';
import { TypeModule } from './type/type.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';

@Module({
	imports: [  
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
		MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.wmhuhj2.mongodb.net/?retryWrites=true&w=majority'),
		UserModule,
		RolesModule,
		DeviceModule,
		FileModule,
		BrandModule,
		TypeModule,
		BasketModule,
		OrderModule
	]
})
export class AppModule {}
