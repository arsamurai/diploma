import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesService } from '../roles/roles.service';
import { BasketService } from '../basket/basket.service';
import { Role, RoleSchema } from '../roles/schemas/roles.schema';
import { Basket, BasketSchema } from '../basket/schemas/basket.schema';
import { FileService } from 'src/file/file.service';
import { BasketItem, BasketItemSchema } from 'src/basket/schemas/basketItem.schema';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
		MongooseModule.forFeature([{name: Basket.name, schema: BasketSchema}]),
		MongooseModule.forFeature([{name: BasketItem.name, schema: BasketItemSchema}]),
    JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  controllers: [UserController],
  providers: [UserService, FileService, RolesService, BasketService, JwtStrategy],
	exports: [
		JwtModule
	]
})
export class UserModule {}
