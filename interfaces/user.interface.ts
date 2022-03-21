import { WithMessage } from './quizes.interface';

export type TUserChangeOption = 'nickname' | 'email' | 'password';

export interface IUserChangeNickname {
  nickname: string;
  password: string;
}

export interface IUserChangeEmail {
  email: string;
  password: string;
}

export interface IUserChangePassword {
  password: string;
  oldPassword: string;
  confirm: string;
}

export type TUserChangeData = IUserChangeEmail | IUserChangeNickname | IUserChangePassword;

export interface IRegisterData {
  email: string;
  nickname: string;
  password: string;
  confirm: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

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

export interface IUserResetPassword extends WithMessage {
  isAccessed: boolean;
}

export interface IUserResetToken extends WithMessage {
  resetToken: string;
  resetTokenExp: Date;
}
