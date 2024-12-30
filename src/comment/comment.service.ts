import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { Comment } from './shemas/comment.shema';
import { ErrorMessages, Messages } from 'src/main/constants/messages.constants';
import { CommentWithReplies } from './types';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: string,
  ): Promise<Comment> {
    return new this.commentModel({
      ...createCommentDto,
      userId: userId,
    }).save();
  }

  async getUserMap(userIds: string[]): Promise<Record<string, any>> {
    const users = await this.userModel
      .find({ _id: { $in: userIds } })
      .lean()
      .exec();

    const userMap = users.reduce(
      (acc, user) => {
        acc[user._id.toString()] = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        };

        return acc;
      },
      {} as Record<string, any>,
    );

    return userMap;
  }

  async getComments(productId: string): Promise<CommentWithReplies[]> {
    const comments = await this.commentModel
      .find({ productId })
      .sort({ createdDate: -1 })
      .lean()
      .exec();
    const userIds = Array.from(
      new Set(comments.map((comment) => comment.userId)),
    );

    const userMap = await this.getUserMap(userIds);

    const commentsWithUser = comments.map((comment) => ({
      ...comment,
      user: userMap[comment.userId] || null,
    }));

    const repliesGroups: Record<string, Comment[]> = commentsWithUser.reduce(
      (acc, item) => {
        if (!item.parentId) return acc;
        if (!acc[item.parentId]) acc[item.parentId] = [];
        acc[item.parentId].push(item);

        return acc;
      },
      {},
    );

    const result = commentsWithUser
      .filter((comment) => !comment.parentId)
      .map((comment) => ({
        ...comment,
        replies: repliesGroups[comment._id.toString()] || [],
      }));

    return result as CommentWithReplies[];
  }

  async updateComment(
    commentId: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentModel.findOne({ _id: commentId });

    if (!comment) {
      throw new NotFoundException(ErrorMessages.COMMENT_NOT_FOUND);
    }

    if (comment.userId !== userId.toString()) {
      throw new ForbiddenException(Messages.NOT_FOUND_PERMISSION('modify'));
    }

    comment.text = updateCommentDto.text;
    comment.isUpdated = true;

    return comment.save();
  }

  async deleteComment(
    commentId: string,
    userId: string,
  ): Promise<{ message: string }> {
    const comment = await this.commentModel.findOne({ _id: commentId });

    if (!comment) {
      throw new NotFoundException(ErrorMessages.COMMENT_NOT_FOUND);
    }

    if (comment.userId !== userId.toString()) {
      throw new ForbiddenException(Messages.NOT_FOUND_PERMISSION('delete'));
    }

    const result = await this.commentModel.deleteOne({ _id: commentId });

    if (result.deletedCount === 0) {
      throw new NotFoundException(ErrorMessages.FAILED_TO_DELETE);
    }

    return { message: Messages.COMMENT_DELETED };
  }
}
