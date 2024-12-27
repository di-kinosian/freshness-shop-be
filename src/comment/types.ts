import { Comment } from "./shemas/comment.shema";

export type CommentWithReplies = Comment & {replies?: Comment[]};
