import { Dispatch } from "react";
import { ALERT_BEFORE_DISAPPEAR, statuses } from "../../constants/app";
import { appActionTypes, IAppActions } from "../interfaces-reducers/appReducer.interface";

export const setAppAlert = (message: string, status: statuses) => {
  return (dispatch: Dispatch<IAppActions>): void => {
    const id = String(Date.now() * Math.random());
    dispatch({type: appActionTypes.SET_ALERT, payload: { message, status, id }});
  };
};

export const clearAppAlert = (id: string | number) => {
  return (dispatch: Dispatch<IAppActions>): void => {
    dispatch({type: appActionTypes.CLEAR_ALERT, payload: id});
  };
};