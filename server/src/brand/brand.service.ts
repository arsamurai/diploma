import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Device, DeviceDocument } from 'src/device/schemas/device.schema';
import { Type, TypeDocument } from 'src/type/schemas/type.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Brand, BrandDocument } from './schemas/brand.schema';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Type.name) private typeModel: Model<TypeDocument>,
  ) {}

	async create(dto: CreateBrandDto) {
		const brand = await this.brandModel.create({...dto});
    return brand;
  }

	async getAll() {
    const brands = await this.brandModel.find();
    return brands;
  }

	
	async getAllByType(value: string) {
		const type = await this.typeModel.findOne({value});
		const devices = await this.deviceModel.find({typeId: type._id});
		const devicesBrands = [...new Set(devices.map(device => device.brandId.toString()))];
		const brands = await Promise.all(devicesBrands.map(async (item: any) => {
			return await this.brandModel.findOne({_id: item});
		}));
    return brands;
  }

	async getOne(value: string) {
    const brand = await this.brandModel.findOne({value});
    return brand;
  }

	async delete(id: ObjectId) {
		const brand = await this.brandModel.findOne({_id: id});
		await brand.remove();
    return brand;
  }
}
