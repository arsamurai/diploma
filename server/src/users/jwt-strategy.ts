import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY || 'SECRET',
    });
  }

  async validate(payload: any) {
    return {...payload};
    //return await this.userService.getOne(id);
  }
}