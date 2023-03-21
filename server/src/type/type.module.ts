import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { Type, TypeSchema } from './schemas/type.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
		MongooseModule.forFeature([{name: Type.name, schema: TypeSchema}]),
		JwtModule.register({
      secret: process.env.JWT_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }), 
  ],
  controllers: [TypeController],
  providers: [TypeService],
	exports: [
    TypeService,
		JwtModule
  ]
})
export class TypeModule {}
