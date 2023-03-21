import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { DeviceInfo, DeviceInfoDocument } from './schemas/device-info.schema';
import { Device, DeviceDocument } from './schemas/device.schema';
import { CreateDeviceDto } from './dto/create-device.dto';
import { FileService } from '../file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Type, TypeDocument } from 'src/type/schemas/type.schema';
import { Brand, BrandDocument } from 'src/brand/schemas/brand.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Type.name) private typeModel: Model<TypeDocument>,
    @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
    @InjectModel(DeviceInfo.name)
    private deviceInfoModel: Model<DeviceInfoDocument>,
    private fileService: FileService,
  ) {}

  async create(
    dto: CreateDeviceDto,
    image: { originalname: string; buffer: string | NodeJS.ArrayBufferView },
  ) {
    const {
      name,
      price,
      discount,
      brandId,
      typeId,
      screenDiagonal,
      screenRefreshRate,
      batteryCapacity,
      сonnection,
      size,
      weight,
      color,
      otherDescr,
      countryProductManufacturer,
    } = dto;
    const imgPath = this.fileService.createFile(image);
    const deviceInfo = await this.deviceInfoModel.create({
      screenDiagonal,
      screenRefreshRate,
      batteryCapacity,
      сonnection,
      size,
      weight,
      color,
      otherDescr,
      countryProductManufacturer,
    });
    const device = await this.deviceModel.create({
      name,
      price,
      discount,
      imgPath,
      info: deviceInfo._id,
      brandId,
      typeId,
    });
    return device.populate('info brandId typeId');
  }

  async update(
    dto: UpdateDeviceDto,
  ) {
    const {
			id,
      name,
      price,
      discount,
      brandId,
      typeId,
      screenDiagonal,
      screenRefreshRate,
      batteryCapacity,
      сonnection,
      size,
      weight,
      color,
      otherDescr,
      countryProductManufacturer,
    } = dto;
		if(!id) {
			throw new HttpException(
        'Введіть id',
        HttpStatus.BAD_REQUEST,
      );
		}
    const device = await this.deviceModel.findById(id);
		if (!device) {
      throw new HttpException(
        'Товар з таким id не існує',
        HttpStatus.NOT_FOUND,
      );
    }
    const deviceInfo = await this.deviceInfoModel.findById(device.info);

		await deviceInfo.updateOne({
      screenDiagonal,
      screenRefreshRate,
      batteryCapacity,
      сonnection,
      size,
      weight,
      color,
      otherDescr,
      countryProductManufacturer,
    });
    await device.updateOne({
      name,
      price,
      discount,
      info: deviceInfo._id,
      brandId,
      typeId,
    }, { upsert: true });

    return device.populate('info brandId typeId');
  }

	async getByTypeAndBrand(typeValue: string, brandValue: string, sort: string, order: string, offset = 0) {
		const type = await this.typeModel.findOne({value: typeValue});
		const brand = await this.brandModel.findOne({value: brandValue});
		const s = [order === "desc"] ? -1 : 1;
		const count = await this.deviceModel.find({typeId: type._id, brandId: brand._id}).count();
    const devices = await this.deviceModel
      .find({typeId: type._id, brandId: brand._id})
      .populate('info brandId typeId comments')
			.sort({[sort]: -1})
      .skip(Number(offset))
      .limit(12);
    return {devices, count};
  }

  async getByType(value: string, count = 6) {
		const type = await this.typeModel.findOne({value});
    const devices = await this.deviceModel
      .find({typeId: type._id})
      .populate('info brandId typeId comments')
      .limit(Number(count));
    return devices;
  }

  async getByBrand(value: string, count = 6) {
		const brand = await this.brandModel.findOne({value});
    const devices = await this.deviceModel
      .find({brandId: brand._id})
      .populate('info brandId typeId comments')
      .limit(Number(count));
    return devices;
  }

	 async getByDiscount(count = 6) {
    const devices = await this.deviceModel
      .find({discount: { $exists : true } })
      .populate('info brandId typeId comments')
      .limit(Number(count));
    return devices;
  }

	async getPopular(count = 6) {
    const devices = await this.deviceModel
      .find({rating: {$gte: 4}})
      .populate('info brandId typeId comments')
      .limit(Number(count));
    return devices;
  }

  async search(query: string) {
    const devices = !!query && await this.deviceModel
      .find({
        name: { $regex: new RegExp(query, 'i') },
      })
      .populate('info brandId typeId');
		
		const types = !!query && await this.typeModel.find({name: { $regex: new RegExp(query, 'i') }});
    return {
			devices,	
			types
		};
  }

	async getRecommendations(typeVal?: string, brandVal?: string, count = 10) {
		const type = typeVal && await this.typeModel.findOne({value: typeVal});
		const brand = brandVal &&  await this.brandModel.findOne({value: brandVal});
		console.log(type)
    const devices = await this.deviceModel
      .find({typeId: type ? type._id : { $exists : true }, brandId: brand ? brand._id : { $exists : true }})
      .populate('info brandId typeId comments')
      .limit(Number(count));
    return devices;
  }

  async getAll(count = 10, offset = 0) {
    const devices = await this.deviceModel
      .find()
			.skip(Number(offset))
			.limit(Number(count))
      .populate('info brandId typeId comments');
    return devices;
  }

	async getOne(id: ObjectId) {
    const device = await this.deviceModel
      .findById(id)
      .populate('info brandId typeId comments');
    return device;
  }

  async delete(id: ObjectId) {
    const device = await this.deviceModel.findByIdAndDelete(id);
    const deviceInfo = await this.deviceInfoModel.findByIdAndDelete(
      device.info,
    );
    return [device._id, deviceInfo._id];
  }

  async addComment(dto: CreateCommentDto) {
    const device = await this.deviceModel.findById(dto.deviceId);
    const comment = await this.commentModel.create({ ...dto });
    const comments = await this.commentModel.find({ deviceId: dto.deviceId });
    const starsCount = comments.reduce(
      (currentValue, comment) => currentValue + comment.stars,
      0,
    );

		let ratingAverage = 0;
		const divideResult = (starsCount / comments.length).toFixed(2).split(".")[1];
		if(+divideResult < 25) ratingAverage = Math.floor(starsCount / comments.length);
		else if (25 < +divideResult && +divideResult < 75) ratingAverage = Math.floor(starsCount / comments.length) + 0.5;
		else if (+divideResult > 75) ratingAverage = Math.ceil(starsCount / comments.length);

    device.comments.push(comment._id);
    device.rating = ratingAverage;
    await device.save();
    return comment;
  }
}
