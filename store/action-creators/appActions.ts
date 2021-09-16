import { statuses } from "../../constants/app";
import { appActionTypes, IAppSetAlert, IAppClearAlert } from "../interfaces-reducers/appReducer.interface";

export const setAppAlert = (message: string, status: statuses): IAppSetAlert => {
  const id = String(Date.now() * Math.random());
  return {type: appActionTypes.SET_ALERT, payload: { message, status, id }};
};

export const clearAppAlert = (id: string | number): IAppClearAlert => {
  return {type: appActionTypes.CLEAR_ALERT, payload: id};
};