import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
	UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { BasketService } from './basket.service';
import { SetDeviceDto } from './dto/set-device.dto';

@Controller('/basket')
export class BasketController {
  constructor(private basketService: BasketService) {}

	@Roles('USER')
	@UseGuards(RolesGuard)
  @Post('/')
  addDevice(@Body() dto: SetDeviceDto) {
    return this.basketService.addDevice(dto);
  }

	@Roles('USER')
	@UseGuards(RolesGuard)
  @Delete('/')
  removeDevice(@Body() dto: SetDeviceDto) {
    return this.basketService.removeDevice(dto);
  }

	@Roles('USER')
	@UseGuards(RolesGuard)
  @Post('/minus')
  minusDevice(@Body() dto: SetDeviceDto) {
    return this.basketService.minusDevice(dto);
  }

	@Roles('USER')
	@UseGuards(RolesGuard)
  @Get('/:id')
  getDevices(@Param('id') userId: ObjectId) {
    return this.basketService.getDevices(userId);
  }
}
