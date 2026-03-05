export interface User {
  password: string;
  name: string;
  username: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}