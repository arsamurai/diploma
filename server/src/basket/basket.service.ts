import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { SetDeviceDto } from './dto/set-device.dto';
import { Basket, BasketDocument } from './schemas/basket.schema';
import { BasketItem, BasketItemDocument } from './schemas/basketItem.schema';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket.name) private basketModel: Model<BasketDocument>,
    @InjectModel(BasketItem.name)
    private basketItemModel: Model<BasketItemDocument>,
  ) {}

  async createBasket(userId: ObjectId) {
    const basket = await this.basketModel.create({ user: userId });
    return basket.populate({ path: "devices", populate: "device" });;
  }

  async getDevices(userId: ObjectId) {
    const basket = await this.basketModel
      .findOne({ user: userId })
      .populate({ path: "devices", populate: "device" });
    return basket;
  }

  async removeDevice(dto: SetDeviceDto) {
    const { userId, deviceId } = dto;
    const basket = await this.basketModel.findOne({ user: userId });
    const basketItem = await this.basketItemModel.findOne({
      basket: basket._id,
      device: deviceId,
    });
    basketItem.remove();
    await basket.save();
    return basket.populate({ path: "devices", populate: "device" });
  }

  async addDevice(dto: SetDeviceDto) {
    const { userId, deviceId } = dto;
    const basket = await this.basketModel.findOne({ user: userId });
    const candidate = await this.basketItemModel.findOne({
      device: deviceId,
      basket: basket._id,
    });
    if (candidate) {
      candidate.count += 1;
      await candidate.save();
      return basket.populate({ path: "devices", populate: "device" });
    }
    const basketItem = await this.basketItemModel.create({
      device: deviceId,
      basket: basket._id,
    });
    basket.devices.push(basketItem._id);
    await basket.save();
    return basket.populate({ path: "devices", populate: "device" });
  }

  async minusDevice(dto: SetDeviceDto) {
    const { userId, deviceId } = dto;
    const basket = await this.basketModel.findOne({ user: userId });
    const basketItem = await this.basketItemModel.findOne({
      basket: basket._id,
      device: deviceId,
    });
    if (basketItem.count > 1) basketItem.count -= 1;
    await basketItem.save();
    return basket.populate({ path: "devices", populate: "device" });
  }

  async clearBasket(user: ObjectId) {
    const basket = await this.basketModel.findOne({ user });
    basket.devices = [];
    await basket.save();
    return basket;
  }
}
