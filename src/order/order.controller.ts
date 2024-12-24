import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SummaryConstants } from 'src/main/constants/api.constants';
import { ConfirmOrderDto, CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('create')
  @ApiOperation({ summary: SummaryConstants.ADD_ORDER })
  async createOrder(@Request() req, @Body() CreateOrderDto: CreateOrderDto) {
    return this.OrderService.createOrder(req.user._id, CreateOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post('confirm')
  @ApiOperation({ summary: SummaryConstants.ORDER_CONFIRM })
  async confirmOrder(@Request() req, @Body() ConfirmOrderDto: ConfirmOrderDto) {
    return this.OrderService.confirmOrder(
      req.user._id,
      ConfirmOrderDto.sessionId,
    );
  }
}
