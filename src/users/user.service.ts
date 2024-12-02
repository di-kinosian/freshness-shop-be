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
import { Product, WishList } from 'src/product/product.types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel('Product') private productModel: Model<Product>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ user: User }> {
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

    return { user };
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getWishList(userId: string): Promise<Product[]> {
    const user = await this.userModel.findById(userId, 'wishList');

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    const productIds = user.wishList;

    if (!productIds || productIds.length === 0) {
      return [];
    }

    const products = await this.productModel
      .find({ _id: { $in: productIds } })
      .exec();

    return products;
  }

  async addToWishList(
    userId: string,
    productId: string,
  ): Promise<WishList> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { wishList: productId } },
      { new: true },
    );

    return {
      wishList: user.wishList,
    };
  }

  async deleteFromWishList(
    userId: string,
    productId: string,
  ): Promise<WishList> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { wishList: productId } },
      { new: true },
    );

    return {
      wishList: user.wishList,
    };
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

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    user.refreshToken = refreshToken;
    await user.save();
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.userModel.findOne({ refreshToken }).exec();
  }

  async removeRefreshToken(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }

    user.refreshToken = '';
    await user.save();
  }
}
