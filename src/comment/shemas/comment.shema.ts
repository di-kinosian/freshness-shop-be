import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: false })
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  parentId?: string | null;

  @Prop({ default: false })
  isUpdated: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
