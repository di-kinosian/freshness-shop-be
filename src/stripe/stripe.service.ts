import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateCheckoutSessionDto } from './dto/session.dto';
import { OrderDocument } from 'src/order/shemas/order.shema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  async createCheckoutSession(
    userId: string,
    CreateCheckoutSessionDto: CreateCheckoutSessionDto,
  ) {
    const orderedProducts = CreateCheckoutSessionDto.products;
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: orderedProducts.map((item) => ({
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

    let order = await this.orderModel.findOne({
      userId,
      _id: CreateCheckoutSessionDto.orderId,
    });

    if (order) {
      order.checkoutId = session.id;
      order.updatedAt = new Date();
      await order.save();
    }

    return session;
  }
}
