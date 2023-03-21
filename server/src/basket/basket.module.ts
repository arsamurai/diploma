import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { Basket, BasketSchema } from './schemas/basket.schema';
import { BasketItem, BasketItemSchema } from './schemas/basketItem.schema';

@Module({
  imports: [
		MongooseModule.forFeature([{name: Basket.name, schema: BasketSchema}]),
		MongooseModule.forFeature([{name: BasketItem.name, schema: BasketItemSchema}]),
		JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  controllers: [BasketController],
  providers: [BasketService],
	exports: [
    BasketService,
		JwtModule
  ]
})
export class BasketModule {}
