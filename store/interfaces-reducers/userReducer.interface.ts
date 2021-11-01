export interface IUserReducer {
  nickname: string;
  email: string;
  id: string;
}

export interface IUserState {
  user: IUserReducer;
  loading: boolean;
  isAuthenticated: boolean;
  resetToken?: string;
  hasSubscription?: boolean;
  clientSecret?: string;
}

export interface IUserActionDefault {
  type: userTypes.DEFAULT;
}

export interface IUserActionFetchUserBegining {
  type: userTypes.FETCH_USER_BEGINING;
}

export interface IUserActionFetchUserSuccess {
  type: userTypes.FETCH_USER_SUCCESS;
  payload: IUserReducer;
}

export interface IUserActionFetchUserError {
  type: userTypes.FETCH_USER_ERROR;
}

export interface IUserActionClearError {
  type: userTypes.CLEAR_ERROR;
}

export interface IUserActionLogOut {
  type: userTypes.USER_LOGOUT;
}

export interface IUserRegister {
  type: userTypes.REGISTER_USER;
  payload: any;
}

export interface IUserLogin {
  type: userTypes.LOGIN_USER;
  payload: any;
}

export interface IUserReset {
  type: userTypes.RESET_USER;
  payload: any;
}

export interface IUserSetResetToken {
  type: userTypes.SET_RESET_TOKEN;
  payload: string;
}

export interface IUserDeleteResetToken {
  type: userTypes.DELETE_RESET_TOKEN;
}

export interface IUserChangeInfo {
  type: userTypes.CHANGE_INFO;
  payload: any;
}

export interface IUserPayForSubscription {
  type: userTypes.PAY_FOR_SUBSCRIPTION;
  payload: {
    stripe: any;
    clientSecret: string;
    method: any;
  }
}

export interface IUserGetClientSecret {
  type: userTypes.GET_CLIENT_SECRET;
  payload: {
    stripe: any;
    method: any;
    email: string;
  };
}

export interface IUserSetClientSecret {
  type: userTypes.SET_CLIENT_SECRET;
  payload: string;
}

export interface IUserPayForSubscriptionSuccess {
  type: userTypes.PAY_FOR_SUBSCRIPTION_SUCCESS;
  payload: boolean;
}

export enum userTypes {
  DEFAULT = 'DEFAULT',
  REGISTER_USER='REGISTER_USER',
  LOGIN_USER='LOGIN_USER',
  RESET_USER='RESET_USER',
  FETCH_USER_BEGINING = 'FETCH_USER_BEGINING',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  USER_LOGOUT = 'USER_LOGOUT',
  SET_RESET_TOKEN='SET_RESET_TOKEN',
  DELETE_RESET_TOKEN='DELETE_RESET_TOKEN',
  CHANGE_INFO='CHANGE_INFO',
  PAY_FOR_SUBSCRIPTION='PAY_FOR_SUBSCRIPTION',
  PAY_FOR_SUBSCRIPTION_SUCCESS='PAY_FOR_SUBSCRIPTION_SUCCESS',
  SET_CLIENT_SECRET='SET_CLIENT_SECRET',
  GET_CLIENT_SECRET='GET_CLIENT_SECRET'
}

export type IUserActions = IUserActionFetchUserBegining |
  IUserActionFetchUserSuccess |
  IUserActionFetchUserError |
  IUserActionDefault |
  IUserActionClearError |
  IUserActionLogOut |
  IUserSetResetToken |
  IUserDeleteResetToken |
  IUserChangeInfo |
  IUserSetClientSecret |
  IUserGetClientSecret |
  IUserPayForSubscription |
  IUserPayForSubscriptionSuccess;
