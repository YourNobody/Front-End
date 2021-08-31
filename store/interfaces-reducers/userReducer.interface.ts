export interface IUserReducer {
  firstName?: string;
  lastName?: string;
  email: string;
  isAuthenticated: boolean;
}

export interface IUserState {
  user: IUserReducer;
  loading: boolean;
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

export enum userTypes {
  DEFAULT = 1, FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR, CLEAR_ERROR
}

export type IUserAction = IUserActionFetchUser | IUserActionFetchUserSuccess | IUserActionFetchUserError | IUserActionDefault | IUserActionClearError;
