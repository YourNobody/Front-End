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

export interface IUserActionFetchUserBegining {
  type: userTypes.FETCH_USER_BEGINING,
}

export interface IUserActionFetchUserEnding {
  type: userTypes.FETCH_USER_ENDING,
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

export interface IUserActionLogIn {
  type: userTypes.SET_AUTHENTICATED,
}

export enum userTypes {
  DEFAULT = 1, FETCH_USER_BEGINING, FETCH_USER_SUCCESS, FETCH_USER_ERROR, CLEAR_ERROR, USER_LOGOUT, SET_AUTHENTICATED, FETCH_USER_ENDING
}

export type IUserActions = IUserActionFetchUserBegining | IUserActionFetchUserEnding | IUserActionFetchUserSuccess | IUserActionFetchUserError | IUserActionDefault | IUserActionClearError | IUserActionLogOut | IUserActionLogIn;
