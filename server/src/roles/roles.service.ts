import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddUserDto } from './dto/add-user.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './schemas/roles.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.roleModel.create(dto);
    return role;
  }

  async addUser(dto: AddUserDto) {
		const {userId, roleValue} = dto
    const role = await this.roleModel.findOne({value: roleValue});
		role.users.push(userId)
		await role.save();
    return role;
  }

  async getAllRoles() {
    const roles = await this.roleModel.find().populate('users');
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleModel.findOne({ value });
    return role;
  }
}
