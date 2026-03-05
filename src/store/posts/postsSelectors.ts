import { RootState } from "../index";

export const selectPosts = (state: RootState) =>
  state.posts.posts;

export const selectPostsLoading = (state: RootState) =>
  state.posts.loading;

export const selectPostsError = (state: RootState) =>
  state.posts.error;