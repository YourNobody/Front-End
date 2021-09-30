export interface IUser {
  nickname: string;
  email: string;
  isAuthenticated: boolean;
}

export interface IUserError {
  message: string;
  isAuthenticated: boolean;
}

export interface IUserWithToken {
  token: string;
  user: {
    email: string;
    id: string;
    nickname: string;
  }
}

export interface WithQuizes {
  user: {
    quizes: any[];
  }
}