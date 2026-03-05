export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}