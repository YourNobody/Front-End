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
  IUserState
} from "../interfaces-reducers/userReducer.interface";

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

export const userLogOut = (): IUserActionLogOut => ({ type: userTypes.USER_LOGOUT });