// import {LOCALSTORAGE_ACCESS_TOKEN_NAME, LOCALSTORAGE_USER_DATA_NAME} from "../../constants/app";
// import {
//   IUserReducer,
//   IUserActionDefault,
//   IUserActionFetchUserBeginning,
//   IUserActionFetchUserError,
//   IUserActionFetchUserSuccess,
//   userTypes,
//   IUserActionClearError,
//   IUserActionLogOut,
//   IUserRegister,
//   IUserLogin,
//   IUserReset,
//   IUserSetResetToken,
//   IUserDeleteResetToken,
//   IUserGetClientSecret,
//   IUserPayForSubscription,
//   IUserSetSubscriptions,
//   IUserCancelSubscription,
//   IUserActionLogOutSuccess,
//   IUserActivate, IUserChangeInfo,
// } from '../store-interfaces/userReducer.interface'
// import {IUserResponse} from "../store-interfaces/common.interface";
//
// export const userDataFetchingStart = (): IUserActionFetchUserBeginning => ({ type: userTypes.FETCH_USER_BEGINNING });
//
// export const userDataFetched = (payload: IUserResponse, accessToken: string): IUserActionFetchUserSuccess => {
//   if (!payload) throw new Error('Something went wrong in recording');
//
//   return { type: userTypes.FETCH_USER_SUCCESS, payload: { user: payload, accessToken }};
// };
//
// export const userDataFetchedError = (): IUserActionFetchUserError => {
//   return { type: userTypes.FETCH_USER_ENDING };
// };
//
// export const userDataFetchingEnd = (): IUserActionFetchUserError => {
//   return { type: userTypes.FETCH_USER_ENDING };
// };
//
// export const fetchUserDefault = (): IUserActionDefault => ({ type: userTypes.DEFAULT });
//
// export const clearError = (): IUserActionClearError => ({ type: userTypes.CLEAR_ERROR });
//
// export const userLogOut = (redirectFunc?: () => void): IUserActionLogOut => {
//   return { type: userTypes.USER_LOGOUT, redirectFunc };
// };
//
// export const userLogOutSuccessful = (): IUserActionLogOutSuccess => {
//   localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_NAME);
//
//   return { type: userTypes.USER_LOGOUT_SUCCESSFUL };
// };
//
// export const userRegister = (payload, redirectFunc?: () => void): IUserRegister => {
//   return { type: userTypes.REGISTER_USER, payload, redirectFunc };
// };
//
// export const userLogin = (payload, redirectFunc?: () => void): IUserLogin => {
//   return { type: userTypes.LOGIN_USER, payload, redirectFunc };
// };
//
// export const userReset = (payload, resetToken?: string): IUserReset => {
//   return { type: userTypes.RESET_USER, payload };
// };
//
// export const userDeleteResetToken = (): IUserDeleteResetToken => {
//   return { type: userTypes.DELETE_RESET_TOKEN };
// };
//
// export const userSetResetToken = (payload, expTime): IUserSetResetToken => {
//   expTime && (Date.now() - new Date(expTime).getTime()) > 0 && setTimeout(() => {
//     userDeleteResetToken();
//   }, Date.now() - new Date(expTime).getTime());
//
//   return { type: userTypes.SET_RESET_TOKEN, payload };
// };
//
// export const userChangeInfoSuccess = (payload: IUserResponse): IUserChangeInfo => {
//   return { type: userTypes.CHANGE_INFO_SUCCESS, payload };
// };
//
// export const userChangeInfo = (changeOption: string, payload) => {
//   return { type: userTypes.CHANGE_INFO, payload, changeOption };
// };
//
// export const payForSubscription = (stripe: any, clientSecret: string, method: any): IUserPayForSubscription => {
//   return { type: userTypes.PAY_FOR_SUBSCRIPTION, payload: { stripe, clientSecret, method } };
// }
//
// export const setUserSubscriptions = (payload): IUserSetSubscriptions => {
//   return { type: userTypes.SET_SUBSCRIPTIONS, payload };
// };
//
// export const getClientSecretAndSubscribe = (priceId, stripe, email, method): IUserGetClientSecret => {
//   return { type: userTypes.GET_CLIENT_SECRET, payload: { stripe, method, email, priceId } };
// };
//
// export const cancelSubscription = (payload): IUserCancelSubscription => {
//   return { type: userTypes.CANCEL_SUBSCRIPTION, payload };
// };
//
// export const activateAccount = (activationLink: string): IUserActivate => {
//   return { type: userTypes.ACTIVATE_ACCOUNT, payload: activationLink };
// }
//
// export const activateAccountSuccess = () => {
//   return { type: userTypes.ACTIVATE_ACCOUNT_SUCCESS }
// }
//
// export const checkAuth = () => {
//   return { type: userTypes.CHECK_AUTH };
// }
//
// export const checkAuthSuccess = (payload: IUserResponse, accessToken: string) => {
//   localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_NAME, accessToken);
//
//   return { type: userTypes.CHECK_AUTH_SUCCESS, payload: { user: payload, accessToken } };
// }
//
// export default {
//   userLogOut,
//   userRegister,
//   userLogin,
//   userReset,
//   userChangeInfo,
//   payForSubscription,
//   getClientSecretAndSubscribe,
//   cancelSubscription,
//   activateAccount,
//   checkAuth
// };