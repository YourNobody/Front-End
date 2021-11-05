import { LOCALSTORAGE_USER_DATA_NAME } from "../../constants/app";
import {
  IUserReducer,
  IUserActionDefault,
  IUserActionFetchUserBegining,
  IUserActionFetchUserError,
  IUserActionFetchUserSuccess,
  userTypes,
  IUserActionClearError,
  IUserActionLogOut,
  IUserState,
  IUserRegister,
  IUserLogin,
  IUserReset,
  IUserSetResetToken,
  IUserDeleteResetToken,
  IUserChangeInfo,
  IUserGetClientSecret,
  IUserSetClientSecret,
  IUserPayForSubscription, IUserPayForSubscriptionSuccess,
} from '../interfaces-reducers/userReducer.interface'

export const fetchUserBegining = (): IUserActionFetchUserBegining => ({ type: userTypes.FETCH_USER_BEGINING });

export const fetchUserSuccess = (payload: Omit<IUserState, 'loading' | 'isAuthenticated'> & { token: string }): IUserActionFetchUserSuccess => {
  localStorage.removeItem(LOCALSTORAGE_USER_DATA_NAME);

  if (!payload) throw new Error('Something went wrong in recording');
  localStorage.setItem(LOCALSTORAGE_USER_DATA_NAME, JSON.stringify({ user: payload.user, token: payload.token }));
  return { type: userTypes.FETCH_USER_SUCCESS, payload: payload.user };
};

export const fetchUserError = (): IUserActionFetchUserError => {
  localStorage.removeItem(LOCALSTORAGE_USER_DATA_NAME);
  return { type: userTypes.FETCH_USER_ERROR };
};

export const fetchUserDefault = (): IUserActionDefault => ({ type: userTypes.DEFAULT });

export const clearError = (): IUserActionClearError => ({ type: userTypes.CLEAR_ERROR });

export const userLogOut = (): IUserActionLogOut => {
  localStorage.removeItem(LOCALSTORAGE_USER_DATA_NAME);
  return { type: userTypes.USER_LOGOUT };
};

export const userRegister = (payload): IUserRegister => {
  return { type: userTypes.REGISTER_USER, payload };
};

export const userLogin = (payload): IUserLogin => {
  return { type: userTypes.LOGIN_USER, payload };
};

export const userReset = (payload, resetToken?: string): IUserReset => {
  return { type: userTypes.RESET_USER, payload };
};

export const userDeleteResetToken = (): IUserDeleteResetToken => {
  return { type: userTypes.DELETE_RESET_TOKEN };
};

export const userSetResetToken = (payload, expTime): IUserSetResetToken => {
  expTime && (Date.now() - new Date(expTime).getTime()) > 0 && setTimeout(() => {
    userDeleteResetToken();
  }, Date.now() - new Date(expTime).getTime());

  return { type: userTypes.SET_RESET_TOKEN, payload };
};

export const userChangeInfo = (payload): IUserChangeInfo => {
  return { type: userTypes.CHANGE_INFO, payload };
};

export const payForSubscription = (stripe: any, clientSecret: string, method: any): IUserPayForSubscription => {
  return { type: userTypes.PAY_FOR_SUBSCRIPTION, payload: { stripe, clientSecret, method } };
}

export const payForSubscriptionSuccess = (payload): IUserPayForSubscriptionSuccess => {
  return { type: userTypes.PAY_FOR_SUBSCRIPTION_SUCCESS, payload };
};

export const getClientSecretAndSubscribe = (priceId, stripe, email, method): IUserGetClientSecret => {
  return { type: userTypes.GET_CLIENT_SECRET, payload: { stripe, method, email, priceId } };
};

export default {
  userLogOut,
  userRegister,
  userLogin,
  userReset,
  fetchUserSuccess,
  userChangeInfo,
  payForSubscription,
  getClientSecretAndSubscribe
};