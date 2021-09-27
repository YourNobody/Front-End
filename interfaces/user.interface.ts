export interface IUser {
  nickname: string;
  email: string;
  isAuthenticated: boolean;
}

export interface IUserError {
  message: string;
  isAuthenticated: boolean;
}

export interface IUserLocalStorage {
  token: string;
  user: {
    email: string;
    id: string;
    nickname: string;
  }
}