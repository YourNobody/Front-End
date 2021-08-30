import { IUserReducer, IUserActionDefault, IUserActionFetchUser, IUserActionFetchUserError, IUserActionFetchUserSuccess, userTypes, IUserActionClearError } from "../reducers.interface";

export const fetchUserBegging = (): IUserActionFetchUser => ({ type: userTypes.FETCH_USER });

export const fetchUserSuccess = (payload: IUserReducer): IUserActionFetchUserSuccess => ({ type: userTypes.FETCH_USER_SUCCESS, payload });

export const fetchUserError = (payload: string): IUserActionFetchUserError => ({ type: userTypes.FETCH_USER_ERROR, payload });

export const fetchUserDefault = (): IUserActionDefault => ({ type: userTypes.DEFAULT });

export const clearError = (): IUserActionClearError => ({ type: userTypes.CLEAR_ERROR });