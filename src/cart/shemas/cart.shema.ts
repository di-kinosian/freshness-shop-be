import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  userId: string;
  @Prop({
    type: [
      {
        quantity: { type: Number, required: true },
        productId: { type: String, required: true },
      },
    ],
    default: [],
  })
  items: { quantity: number; productId: string }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
