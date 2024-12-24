import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './shemas/order.shema';
import { Cart, CartSchema } from 'src/cart/shemas/cart.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: Cart.name, schema: CartSchema },
    ]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})

export class OrderModule {}
