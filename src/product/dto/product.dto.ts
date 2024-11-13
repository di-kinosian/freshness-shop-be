import { Schema, Document } from 'mongoose';

export interface AdditionalInformation {
  key: string;
  value: string | number;
}

export interface Product extends Document {
  _id: string;
  title: string;
  description: string;
  rating?: number;
  price: number;
  quantity: number;
  brand: string;
  country: string;
  images: string[];
  discount?: number;
  categoryId: string;
  subcategoryId: string;
  additionalInformation?: AdditionalInformation[];
}

export const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  brand: { type: String, required: true },
  country: { type: String, required: true },
  images: [{ type: String, required: true }],
  discount: { type: Number },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true,
  },
  additionalInformation: [{ key: String, value: Schema.Types.Mixed }],
});
