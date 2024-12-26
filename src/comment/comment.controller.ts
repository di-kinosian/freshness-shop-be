import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Get()
  get(@Query('productId') productId: string) {
    return this.commentService.getComments(productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(
      id,
      req.user._id,
      updateCommentDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.commentService.deleteComment(id, req.user._id);
  }
}
