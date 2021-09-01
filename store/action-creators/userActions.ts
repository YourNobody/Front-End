import { IUserReducer, IUserActionDefault, IUserActionFetchUser, IUserActionFetchUserError, IUserActionFetchUserSuccess, userTypes, IUserActionClearError, IUserActionLogOut } from "../interfaces-reducers/userReducer.interface";

export const fetchUserBegging = (): IUserActionFetchUser => ({ type: userTypes.FETCH_USER });

export const fetchUserSuccess = (payload: IUserReducer): IUserActionFetchUserSuccess => ({ type: userTypes.FETCH_USER_SUCCESS, payload });

export const fetchUserError = (): IUserActionFetchUserError => ({ type: userTypes.FETCH_USER_ERROR });

export const fetchUserDefault = (): IUserActionDefault => ({ type: userTypes.DEFAULT });

export const clearError = (): IUserActionClearError => ({ type: userTypes.CLEAR_ERROR });

export const userLogOut = (): IUserActionLogOut => ({ type: userTypes.USER_LOGOUT });