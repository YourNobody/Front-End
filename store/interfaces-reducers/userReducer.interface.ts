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
  clientSecret?: string;
  subscriptions?: any[];
}

interface WithRedirectFunction {
  redirectFunc?: () => any;
}

export interface IUserActionDefault {
  type: userTypes.DEFAULT;
}

export interface IUserActionFetchUserBeginning {
  type: userTypes.FETCH_USER_BEGINNING;
}

export interface IUserActionFetchUserSuccess {
  type: userTypes.FETCH_USER_SUCCESS;
  payload: IUserReducer;
}

export interface IUserActionFetchUserError {
  type: userTypes.FETCH_USER_ENDING;
}

export interface IUserActionClearError {
  type: userTypes.CLEAR_ERROR;
}

export interface IUserActionLogOut extends WithRedirectFunction {
  type: userTypes.USER_LOGOUT;
}

export interface IUserActionLogOutSuccess {
  type: userTypes.USER_LOGOUT_SUCCESSFUL;
}

export interface IUserRegister extends WithRedirectFunction {
  type: userTypes.REGISTER_USER;
  payload: any;
}

export interface IUserLogin extends WithRedirectFunction {
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
    priceId: string;
  };
}

export interface IUserSetClientSecret {
  type: userTypes.SET_CLIENT_SECRET;
  payload: string;
}

export interface IUserSetSubscriptions {
  type: userTypes.SET_SUBSCRIPTIONS;
  payload: any;
}

export interface IUserCancelSubscription {
  type: userTypes.CANCEL_SUBSCRIPTION;
  payload: string;
}

export enum userTypes {
  DEFAULT = 'DEFAULT',
  REGISTER_USER = 'REGISTER_USER',
  LOGIN_USER = 'LOGIN_USER',
  RESET_USER = 'RESET_USER',
  USER_LOGOUT_SUCCESSFUL = 'USER_LOGOUT_SUCCESSFUL',
  FETCH_USER_BEGINNING = 'FETCH_USER_BEGINNING',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ENDING = 'FETCH_USER_ENDING',
  CLEAR_ERROR = 'CLEAR_ERROR',
  USER_LOGOUT = 'USER_LOGOUT',
  SET_RESET_TOKEN = 'SET_RESET_TOKEN',
  DELETE_RESET_TOKEN = 'DELETE_RESET_TOKEN',
  CHANGE_INFO = 'CHANGE_INFO',
  PAY_FOR_SUBSCRIPTION = 'PAY_FOR_SUBSCRIPTION',
  SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS',
  SET_CLIENT_SECRET = 'SET_CLIENT_SECRET',
  GET_CLIENT_SECRET = 'GET_CLIENT_SECRET',
  CANCEL_SUBSCRIPTION = 'CANCEL_SUBSCRIPTION'
}

export type IUserActions = IUserActionFetchUserBeginning |
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
  IUserSetSubscriptions |
  IUserActionLogOutSuccess;
