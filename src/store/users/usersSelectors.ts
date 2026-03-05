import { RootState } from "../index";

export const selectUsers = (state: RootState) =>
  state.users.users;

export const selectUsersLoading = (state: RootState) =>
  state.users.loading;