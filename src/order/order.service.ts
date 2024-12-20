import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './shemas/order.shema';
import { Messages } from 'src/main/constants/messages.constants';
import { OrderStatus } from './types';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(
    userId: string,
    CreateOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const { status, products, billingInfo, paymentStatus, totalAmount } =
      CreateOrderDto;

    if (!products || products.length === 0) {
      throw new BadRequestException(Messages.ORDER_MUST_HAVE_PRODUCT);
    }

    await this.orderModel.deleteMany({ status: 'pending', userId });

    const createdOrder = new this.orderModel({
      userId,
      status,
      products,
      billingInfo,
      paymentStatus,
      totalAmount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await createdOrder.save();
  }

  async confirmOrder(userId: string, sessionId: string) {
    let order = await this.orderModel.findOne({
      userId,
      checkoutId: sessionId,
    });

    if (order) {
      order.status = OrderStatus.COMPLETED;
      return await order.save();
    }
  }
}
