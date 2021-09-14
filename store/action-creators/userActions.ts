import { 
  IUserReducer, 
  IUserActionDefault, 
  IUserActionFetchUser, 
  IUserActionFetchUserError, 
  IUserActionFetchUserSuccess, 
  userTypes, 
  IUserActionClearError, 
  IUserActionLogOut,
  IUserActionLogIn
} from "../interfaces-reducers/userReducer.interface";

export const fetchUserBegging = (): IUserActionFetchUser => ({ type: userTypes.FETCH_USER_BEGINING });

export const fetchUserSuccess = (payload: IUserReducer): IUserActionFetchUserSuccess => {
  localStorage.removeItem('user');
  localStorage.setItem('user', JSON.stringify(payload));
  return { type: userTypes.FETCH_USER_SUCCESS, payload };
};

export const fetchUserError = (): IUserActionFetchUserError => {
  localStorage.setItem('user', null);
  return { type: userTypes.FETCH_USER_ERROR };
};

export const fetchUserDefault = (): IUserActionDefault => ({ type: userTypes.DEFAULT });

export const clearError = (): IUserActionClearError => ({ type: userTypes.CLEAR_ERROR });

export const userLogOut = (): IUserActionLogOut => ({ type: userTypes.USER_LOGOUT });

export const userLogIn = (): IUserActionLogIn => ({ type: userTypes.SET_AUTHENTICATED });