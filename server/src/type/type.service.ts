import {
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTypeDto } from './dto/create-type.dto';
import { Type, TypeDocument } from './schemas/type.schema';

@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name) private typeModel: Model<TypeDocument>,
  ) {}

	async create(dto: CreateTypeDto) {
		const type = await this.typeModel.create({...dto});
    return type;
  }
	
	async getAll() {
    const types = await this.typeModel.find();
    return types;
  }

	async getOne(value: string) {
    const type = await this.typeModel.findOne({value});
    return type;
  }

	async delete(id: ObjectId) {
		const type = await this.typeModel.findOne({_id: id});
		await type.remove();
    return type;
  }
}
