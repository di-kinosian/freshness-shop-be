import { Schema } from 'mongoose';

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
