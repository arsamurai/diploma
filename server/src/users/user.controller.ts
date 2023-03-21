import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/registration')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  registration(@UploadedFiles() files, @Body() dto: CreateUserDto) {
    let image = null;
    if (files) image = files.image[0];
    return this.userService.registration(dto, image);
  }

  @Post('/login')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  auth(@Request() req) {
    return this.userService.auth(req.user.login);
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Put('/update')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  update(@UploadedFiles() files, @Body() dto: UpdateUserDto) {
    return this.userService.update(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.userService.getAll(count, offset);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }
}
