import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { Comment } from './shemas/comment.shema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    return new this.commentModel(createCommentDto).save();
  }

  async getComments(productId: string): Promise<Comment[]> {
    return this.commentModel
      .find({ productId })
      .sort({ createdDate: -1 })
      .exec();
  }

  async updateComment(
    commentId: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentModel.findOne({ _id: commentId, userId });

    if (!comment) {
      throw new NotFoundException('Comment not found or unauthorized');
    }

    comment.text = updateCommentDto.text;
    comment.isUpdated = true;

    return comment.save();
  }

  async deleteComment(
    commentId: string,
    userId: string,
  ): Promise<{ message: string }> {
    const result = await this.commentModel.deleteOne({
      _id: commentId,
      userId,
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException('Comment not found or unauthorized');
    }

    return { message: 'Comment deleted successfully' };
  }
}
