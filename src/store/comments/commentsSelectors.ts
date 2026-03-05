import { RootState } from "../index";
export const selectComments = (state: RootState) =>
  state.comments.comments;

export const selectCommentsLoading = (state: RootState) =>
  state.comments.loading;

export const selectCommentsError = (state: RootState) =>
  state.comments.error;

export const selectCommentCountByPostId = (postId: number) => (state: RootState) =>
  state.comments.comments.filter((comment) => comment.postId === postId).length;