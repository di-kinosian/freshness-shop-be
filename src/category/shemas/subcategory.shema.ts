import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class SubCategory extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  parentCategoryId: Types.ObjectId;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
