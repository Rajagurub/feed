import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UsersState, User } from "./usersTypes";

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },

    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.username !== action.payload
      );
    },

    clearUsers: (state) => {
      state.users = [];
    },
  },
});

export const { addUser, removeUser, clearUsers } =
  usersSlice.actions;

export default usersSlice.reducer;