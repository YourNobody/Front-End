import { statuses } from "../../constants/app";

interface IAppStatus {
  message: string;
  status: statuses;
  id: string | number;
}

export interface IAppState {
  alerts: IAppStatus[];
  newAlert: {
    id: string | number;
    isAutoDeleted: boolean;
  };
  loading: boolean;
  modalTemplate: JSX.Element;
  subscriptions: any[];
  stripeToken: string;
}

export enum appActionTypes {
  DEFAULT = 'DEFAULT',
  SET_ALERT = 'SET_ALERT',
  CLEAR_ALERT = 'CLEAR_ALERT',
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  SET_ALL_SUBSCRIPTIONS_PRODUCTS = 'SET_ALL_SUBSCRIPTIONS_PRODUCTS',
  GET_ALL_SUBSCRIPTIONS_PRODUCTS = 'GET_ALL_SUBSCRIPTIONS_PRODUCTS',
  LOADING_START = 'LOADING_START'
}

export interface  IAppLoadingStart {
  type: appActionTypes.LOADING_START;
}

export interface IAppDefault {
  type: appActionTypes.DEFAULT;
}

export interface IAppSetAlert {
  type: appActionTypes.SET_ALERT;
  payload: IAppStatus & { isAutoDeleted?: boolean; };
}

export interface IAppClearAlert {
  type: appActionTypes.CLEAR_ALERT;
  payload: string | number;
}

export interface IAppOpenModal {
  type: appActionTypes.OPEN_MODAL;
  payload: JSX.Element;
}

export interface IAppCloseModal {
  type: appActionTypes.CLOSE_MODAL;
}

export interface IAppSetStripeToken {
  type: appActionTypes.SET_ALL_SUBSCRIPTIONS_PRODUCTS;
  payload: any[];
}

export interface IAppGetStripeToken {
  type: appActionTypes.GET_ALL_SUBSCRIPTIONS_PRODUCTS;
}

export type IAppActions = IAppDefault | IAppSetAlert | IAppClearAlert | IAppOpenModal | IAppCloseModal | IAppSetStripeToken | IAppGetStripeToken | IAppLoadingStart;