import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Post, PostsState } from "./postsTypes";
import { postServices } from "../../_api_/post";


const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};


export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await postServices.getAllPost();
    return response.data as Post[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const createPost = createAsyncThunk<
  Post,
  Omit<Post, "id">,
  { rejectValue: string }
>("posts/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await postServices.createPost(payload);
    return response.data as Post;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const updatePost = createAsyncThunk<
  Post,
  { id: number; data: Omit<Post, "id"> },
  { rejectValue: string }
>("posts/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await postServices.updatePost(id, data);
    return response.data as Post;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


export const deletePost = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("posts/delete", async (id, { rejectWithValue }) => {
  try {
    await postServices.deletePost(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder


      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Fetch posts failed";
      })


      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload) {
          state.posts.unshift(action.payload);
        }
      })

      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Create post failed";
      })


      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (p) => p.id === action.payload.id
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })


      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (p) => p.id !== action.payload
        );
      });
  },
});

export default postsSlice.reducer;