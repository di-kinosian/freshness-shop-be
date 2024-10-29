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

    // Check if the email is already in use
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token for the new user
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }

  // New findByEmail method to get user by email
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // New findById method to get user by ID
  async findById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
