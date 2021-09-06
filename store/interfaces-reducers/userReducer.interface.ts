export interface IUserReducer {
  firstName?: string;
  lastName?: string;
  email: string;
  id: string;
  questions: any[];
}

export interface IUserState {
  user: IUserReducer;
  loading: boolean;
  isAuthenticated: boolean;
}

export interface IUserActionDefault {
  type: userTypes.DEFAULT,
}

export interface IUserActionFetchUser {
  type: userTypes.FETCH_USER,
}

export interface IUserActionFetchUserSuccess {
  type: userTypes.FETCH_USER_SUCCESS,
  payload: IUserReducer;
}

export interface IUserActionFetchUserError {
  type: userTypes.FETCH_USER_ERROR,
}

export interface IUserActionClearError {
  type: userTypes.CLEAR_ERROR,
}

export interface IUserActionLogOut {
  type: userTypes.USER_LOGOUT,
}

export enum userTypes {
  DEFAULT = 1, FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, CLEAR_ERROR, USER_LOGOUT
}

export type IUserActions = IUserActionFetchUser | IUserActionFetchUserSuccess | IUserActionFetchUserError | IUserActionDefault | IUserActionClearError | IUserActionLogOut;
