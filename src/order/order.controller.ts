import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SummaryConstants } from 'src/main/constants/api.constants';
import { CreateOrderDto } from './dto/order.dto';

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
}
