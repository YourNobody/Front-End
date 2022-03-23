import { statuses } from "../../constants/app";
import {Observable, Subject, Subscription} from "rxjs";
import {IAppOpenModalConfig} from "@Interfaces/actions.interface";

export interface IAppStatus {
  message: string;
  status: statuses;
  id: string;
}

export interface IAppAlertOptions {
  isAutoDeleted?: boolean;
  toDeleteStream?: Subject<{ readyToDelete: boolean }>;
  toDeleteAllBefore?: boolean;
}

export interface IAppState {
  alerts: IAppStatus[];
  newAlert: {
    id: string;
    options?: IAppAlertOptions
  };
  loading: boolean;
  modalConfig: IAppOpenModalConfig;
  subProducts: any[];
  stripeToken: string;
}

export enum appActionTypes {
  DEFAULT = 'DEFAULT',
  SET_ALERT = 'SET_ALERT',
  CLEAR_ALERT = 'CLEAR_ALERT',
  CLEAR_ALL_ALERTS = 'CLEAR_ALL_ALERTS',
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
  payload: IAppStatus & { options?: IAppAlertOptions };
}

export interface IAppClearAlert {
  type: appActionTypes.CLEAR_ALERT;
  payload: string;
}

export interface IAppClearAllAlerts {
  type: appActionTypes.CLEAR_ALL_ALERTS;
}

export interface IAppOpenModal {
  type: appActionTypes.OPEN_MODAL;
  payload: {
    actionFunc: (params: any) => any;
    actionButtonName: string;
    closeButtonName: string;
    modalQuestion: string;
  }
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

export type IAppActions = IAppDefault | IAppClearAllAlerts
  | IAppSetAlert | IAppClearAlert | IAppOpenModal | IAppCloseModal | IAppSetStripeToken | IAppGetStripeToken | IAppLoadingStart;