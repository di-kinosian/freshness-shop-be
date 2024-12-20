import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OrderStatus, PaymentStatus } from '../types';
import { Product } from 'src/product/product.types';
import { BillingDataDto } from '../dto/billing-info.dto';

export type OrderDocument = Order & Document;

class OrderProduct {
  @Prop({ type: Object, required: true })
  product: Product;

  @Prop({ type: Number, required: true, min: 1 })
  quantity: number;
}

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: OrderStatus })
  status: OrderStatus;

  @Prop({ type: [OrderProduct], required: true })
  products: OrderProduct[];

  @Prop({ type: Object, required: true })
  billingInfo: BillingDataDto;

  @Prop({ required: true, enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @Prop({ required: true, min: 0 })
  totalAmount: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  // @Prop({ required: false })
  // checkoutId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
