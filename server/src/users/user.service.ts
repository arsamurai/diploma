import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BasketService } from 'src/basket/basket.service';
import { FileService } from 'src/file/file.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddHistoryDto } from './dto/add-history.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService,
    private basketService: BasketService,
    private rolesService: RolesService,
    private jwtService: JwtService,
  ) {}

  async registration(
    dto: CreateUserDto,
    image: { originalname: string; buffer: string | NodeJS.ArrayBufferView },
  ) {
    const { login, email, name, surname, byFather, phoneNumber, password } =
      dto;
    const role = await this.rolesService.getRoleByValue('USER');
    if (!email || !password) {
      throw new HttpException(
        'Некорректный email или password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new HttpException(
        'Користувач з таким email вже інсує',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const imgPath = image ? this.fileService.createFile(image) : null;
    const user = await this.userModel.create({
      login,
      email,
      name,
      surname,
      byFather,
      imgPath,
      phoneNumber,
      password: hashPassword,
      roles: [role._id],
    });

    const basket = await this.basketService.createBasket(user._id);
    const token = await this.generateJwt(user);

    await this.rolesService.addUser({ userId: user._id, roleValue: 'USER' });
    return {
      token: token.token,
      user: user,
      basket,
    };
  }

  async login(dto: LoginUserDto) {
    const { login, password } = dto;
    const user = await this.userModel.findOne({ login }).populate('roles').populate({path: "history", populate: "device"});
    if (!user) {
      throw new UnauthorizedException({ message: 'Користувач не знайдений' });
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new UnauthorizedException({ messsage: 'Вказаний невірний пароль' });
    }
    const basket = await this.basketService.getDevices(user._id);
    const token = await this.generateJwt(user);
    return {
      token: token.token,
      user,
      basket,
    };
  }

	async auth(login: string) {
    const user = await this.userModel.findOne({ login }).populate('roles').populate({path: "history", populate: "device"});
    const basket = await this.basketService.getDevices(user._id);
    const token = await this.generateJwt(user);
    return {
      token: token.token,
      user,
      basket,
    };
  }

	async update(
    dto: UpdateUserDto,
  ) {
    const { id, email, name, surname, byFather, phoneNumber } =
      dto;
		if(!id) {
			throw new HttpException(
        'Введіть id',
        HttpStatus.BAD_REQUEST,
      );
		}
    const user = await this.userModel.findById(id).populate('roles').populate({path: "history", populate: "device"});
		if (!user) {
      throw new HttpException(
        'Користувача з таким id не існує',
        HttpStatus.NOT_FOUND,
      );
    }
    await user.updateOne({$set:{
			email, name, surname, byFather, phoneNumber
    }});
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const { roleValue, userId } = dto;
    const user = await this.userModel.findOne({ _id: userId });
    const role = await this.rolesService.getRoleByValue(roleValue);
    if (role && user) {
      user.roles.push(role._id);
      await user.save();
      await this.rolesService.addUser({ userId: user._id, roleValue });
      return dto;
    }
    throw new HttpException(
      'Користувач чи роль не знайдені',
      HttpStatus.NOT_FOUND,
    );
  }

	async addDeviceInHistory(dto: AddHistoryDto) {
		const {userId, devices} = dto;
    const user = await this.userModel.findById(userId);
		user.history = [...user.history, ...devices];
		await user.save();
		return user;
  }


  async getAll(count = 10, offset = 0) {
    const users = await this.userModel.find()
		.skip(Number(offset))
		.limit(Number(count))
		.populate('roles');
    return users;
  }

  // Hepling function
  async generateJwt(user: User) {
    const payload = {
      id: user.id,
      login: user.login,
      name: user.name,
      surname: user.surname,
      byFather: user.byFather,
      email: user.email,
      imgPath: user.imgPath,
      phoneNumber: user.phoneNumber,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
