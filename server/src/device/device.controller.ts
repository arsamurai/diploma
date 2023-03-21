import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceService } from './device.service';
import { ObjectId } from 'mongoose';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('/devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateDeviceDto) {
    const { image } = files;
    return this.deviceService.create(dto, image[0]);
  }

	@Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('/')
	@UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  update(@UploadedFiles() files, @Body() dto: UpdateDeviceDto) {
    return this.deviceService.update(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  delete(@Param('id') id: ObjectId) {
    return this.deviceService.delete(id);
  }

  @Get('/')
  getByTypeAndBrand(@Query('type') type: string, @Query('brand') brand: string, @Query('sort') sort: string, @Query('order') order: string, @Query('offset') offset: number) {
		return this.deviceService.getByTypeAndBrand(type, brand, sort, order, offset) 
  }

  @Get('/type')
  getByType(@Query('value') value: string, @Query('count') count: number) {
    return this.deviceService.getByType(value, count);
  }

  @Get('/brand')
  getByBrand(@Query('value') value: string, @Query('count') count: number) {
    return this.deviceService.getByBrand(value, count);
  }

  @Get('/discount')
  getByDiscount(@Query('count') count: number) {
    return this.deviceService.getByDiscount(count);
  }

	@Get('/rating')
  getPopular(@Query('count') count: number) {
    return this.deviceService.getPopular(count);
  }

	@Roles('ADMIN')
  @UseGuards(RolesGuard)
	@Get('/all')
	getAll(@Query('count') count: number, @Query('offset') offset: number ) {
		return this.deviceService.getAll(count, offset);
	}
	
  @Get('/search')
  search(@Query('query') query: string) {
    return this.deviceService.search(query);
  }

	@Get('/recommendations')
  getRecommendations(@Query('type') type: string, @Query('brand') brand: string ) {
    return this.deviceService.getRecommendations(type, brand);
  }

  @Get('/:id')
  getOne(@Param('id') id: ObjectId) {
    return this.deviceService.getOne(id);
  }

	@Post('/comment')
  addComment(@Body() dto: CreateCommentDto) {
    return this.deviceService.addComment(dto);
  }
}
