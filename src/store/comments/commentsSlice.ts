import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommentsState, Comment } from "./commentsTypes";
import { commentsServices } from "../../_api_/comments";

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk<
  Comment[],
  void,
  { rejectValue: string }
>("comments/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await commentsServices.getAllComments();
    return response.data as Comment[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const createComment = createAsyncThunk<
  Comment,
  Omit<Comment, "id">,
  { rejectValue: string }
>("comments/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await commentsServices.createComments(payload);
    return response.data as Comment;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const updateComment = createAsyncThunk<
  Comment,
  { id: number; data: Omit<Comment, "id"> },
  { rejectValue: string }
>("comments/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await commentsServices.updateComments(id, data);
    return response.data as Comment;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const deleteComment = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("comments/delete", async (id, { rejectWithValue }) => {
  try {
    await commentsServices.deleteComments(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch comments";
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default commentsSlice.reducer;