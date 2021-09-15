import { 
  IUserReducer, 
  IUserActionDefault, 
  IUserActionFetchUserBegining,
  IUserActionFetchUserEnding,
  IUserActionFetchUserError, 
  IUserActionFetchUserSuccess, 
  userTypes, 
  IUserActionClearError, 
  IUserActionLogOut,
  IUserActionLogIn
} from "../interfaces-reducers/userReducer.interface";

export const fetchUserBegining = (): IUserActionFetchUserBegining => ({ type: userTypes.FETCH_USER_BEGINING });
export const fetchUserEnding = (): IUserActionFetchUserEnding => ({ type: userTypes.FETCH_USER_ENDING });

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