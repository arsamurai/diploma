import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AddUserDto } from './dto/add-user.dto';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post('/create-role')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

	@Get('/')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
