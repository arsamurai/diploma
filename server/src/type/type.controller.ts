import {
  Controller,
  Get,
  Post,
	Delete,
	UseGuards,
	Param,
	Body
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeService } from './type.service';

@Controller('/types')
export class TypeController {
  constructor(private typeService: TypeService) {}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
  @Post('/')
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.create(dto);
  }

  @Get('/')
  getAll() {
    return this.typeService.getAll();
  }

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.typeService.delete(id);
  }
}
