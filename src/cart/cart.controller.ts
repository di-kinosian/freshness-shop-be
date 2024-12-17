import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { SummaryConstants } from 'src/main/constants/api.constants';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get('cart')
  @ApiOperation({ summary: SummaryConstants.GET_CART })
  async getCart(@Request() req) {
    return this.cartService.getCart(req.user._id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('add')
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user._id, addToCartDto);
  }
}
