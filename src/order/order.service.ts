import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { OrderDocument } from './shemas/order.shema';
import { Messages } from 'src/main/constants/messages.constants';
import { OrderStatus } from './types';
import Stripe from 'stripe';
import { Cart } from 'src/cart/shemas/cart.shema';

@Injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  async createOrder(userId: string, CreateOrderDto: CreateOrderDto) {
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

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: createdOrder.products.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            description: item.product.description,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.CLIENT_URL}/orderConfirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    createdOrder.checkoutId = session.id;

    await createdOrder.save();

    return {
      url: session.url,
      order: createdOrder,
    };
  }

  async confirmOrder(userId: string, sessionId: string) {
    let order = await this.orderModel.findOne({
      userId,
      checkoutId: sessionId,
    });

    if (order) {
      await this.cartModel.updateOne({ userId }, { $unset: { items: [] } });
      order.status = OrderStatus.COMPLETED;
      return await order.save();
    }
  }
}
