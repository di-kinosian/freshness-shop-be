import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessages } from 'src/main/constants/messages.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; accessToken: string }> {
    const { email, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestException(ErrorMessages.EMAIL_ALREADY_IN_USE);
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    await user.save();

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_EMAIL_NOT_FOUND);
    }

    return user;
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_ID_NOT_FOUND);
    }

    return user;
  }
}
