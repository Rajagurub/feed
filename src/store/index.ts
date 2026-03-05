import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/usersSlice";
import commentsReducer from "./comments/commentsSlice";
import postsReducer from "./posts/postsSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
     comments: commentsReducer,
       posts: postsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;