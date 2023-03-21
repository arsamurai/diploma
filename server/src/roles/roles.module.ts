import {Module} from '@nestjs/common';
import {RolesService} from './roles.service';
import {RolesController} from './roles.controller';
import {Role, RoleSchema} from "./schemas/roles.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  exports: [
    RolesService,
		JwtModule
  ]
})
export class RolesModule {}