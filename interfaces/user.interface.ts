export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  isAuthenticated: boolean;
}

export interface IUserError {
  message: string;
  isAuthenticated: boolean;
}