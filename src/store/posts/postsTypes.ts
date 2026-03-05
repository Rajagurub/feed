export interface Post {
  id: number;
  title: string;
  body: string;
    userId?: number|string|undefined;

}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}