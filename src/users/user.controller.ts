import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { SummaryConstants } from 'src/main/constants/api.constants';
import { UpdateWishListDto } from './dto/with-list.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: SummaryConstants.USER_REGISTRATION })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{ user: User }> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @ApiOperation({ summary: SummaryConstants.GET_USER_PROFILE })
  async getProfile(@Request() req) {
    const userId = req.user._id;
    const user = await this.userService.getProfile(userId);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      wishList: user.wishList,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('wish-list')
  @ApiOperation({ summary: SummaryConstants.GET_USER_WISH_LIST })
  async getWishList(@Request() req) {
    const userId = req.user._id;

    return this.userService.getWishList(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Patch('wish-list/add')
  @ApiOperation({ summary: SummaryConstants.ADD_PRODUCT_TO_WISH_LIST })
  async addToWishList(
    @Request() req,
    @Body() { productId }: UpdateWishListDto,
  ) {
    const userId = req.user._id;

    return this.userService.addToWishList(userId, productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Patch('wish-list/remove')
  @ApiOperation({ summary: SummaryConstants.DELETE_PRODUCT_FROM_WISH_LIST })
  async deleteFromWishList(
    @Request() req,
    @Body() { productId }: UpdateWishListDto,
  ) {
    const userId = req.user._id;

    return this.userService.deleteFromWishList(userId, productId);
  }
}
