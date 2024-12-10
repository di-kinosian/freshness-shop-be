import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request,
  Post,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartItemDto } from './dto/cart-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { SummaryConstants } from 'src/main/constants/api.constants';
import { DeleteFromCartDto } from './dto/delete-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({ summary: SummaryConstants.GET_CART })
  async getCart(@Request() req) {
    const userId = req.user._id;

    return this.cartService.getCart(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('add')
  @ApiOperation({ summary: SummaryConstants.ADD_PRODUCT_TO_CART})
  async addToCart(@Request() req, @Body() CartItemDto: CartItemDto) {
    const userId = req.user._id;

    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }

    return this.cartService.addToCart(userId, CartItemDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put('item/update')
  @ApiOperation({ summary: SummaryConstants.UPDATE_PRODUCT })
  async updateCartItem(@Request() req, @Body() CartItemDto: CartItemDto) {
    const userId = req.user._id;

    if (!userId) {
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    }

    return this.cartService.updateCartItem(userId, CartItemDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete('item/remove')
  @ApiOperation({ summary: SummaryConstants.DELETE_PRODUCT_FROM_CART })
  async deleteFromCart(
    @Request() req,
    @Body() DeleteFromCartDto: DeleteFromCartDto,
  ) {
    const userId = req.user._id;

    return this.cartService.deleteFromCart(userId, DeleteFromCartDto);
  }
}
