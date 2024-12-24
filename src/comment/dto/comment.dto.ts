import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import {
  CommentProperties,
  CommentResponseProperties,
  UpdateCommentProperties,
} from 'src/main/constants/api.constants';

export class CreateCommentDto {
  @ApiProperty(CommentProperties.productId)
  @IsString()
  readonly productId: string;
  @ApiProperty(CommentProperties.userId)
  @IsString()
  readonly userId: string;
  @ApiProperty(CommentProperties.text)
  @IsString()
  readonly text: string;
  @ApiProperty(CommentProperties.parentId)
  @IsOptional()
  @IsString()
  readonly parentId?: string;
}

export class UpdateCommentDto {
  @ApiProperty(UpdateCommentProperties.text)
  @IsString()
  readonly text: string;
}

export class CommentResponseDto {
  @ApiProperty(CommentResponseProperties.id)
  readonly id: string;
  @ApiProperty(CommentResponseProperties.parentId)
  readonly productId: string;
  @ApiProperty(CommentResponseProperties.userId)
  readonly userId: string;
  @ApiProperty(CommentResponseProperties.text)
  readonly text: string;
  @ApiProperty(CommentResponseProperties.parentId)
  readonly parentId?: string | null;
  @ApiProperty(CommentResponseProperties.isUpdated)
  readonly isUpdated: boolean;
}
