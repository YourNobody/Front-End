import { statuses } from "../../constants/app";

interface IAppStatus {
  message: string;
  status: statuses;
  id: string | number;
}

export interface IAppState {
  alerts: IAppStatus[];
  newAlertId: string | number;
  loading: boolean;
}

export enum appActionTypes {
  DEFAULT = 1, SET_ALERT, CLEAR_ALERT,
}

export interface IAppDefault {
  type: appActionTypes.DEFAULT;
}

export interface IAppSetAlert {
  type: appActionTypes.SET_ALERT;
  payload: IAppStatus;
}

export interface IAppClearAlert {
  type: appActionTypes.CLEAR_ALERT;
  payload: string | number;
}

export type IAppActions = IAppDefault | IAppSetAlert | IAppClearAlert;