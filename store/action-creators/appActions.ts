import { statuses } from "../../constants/app";
import {
  appActionTypes,
  IAppSetAlert,
  IAppClearAlert,
  IAppOpenModal,
  IAppCloseModal,
  IAppSetStripeToken, IAppGetStripeToken, IAppLoadingStart,
} from '../interfaces-reducers/appReducer.interface'

export const setAppAlert = (message: string, status: statuses, isAutoDeleted = true): IAppSetAlert => {
  const id = String(Date.now() * Math.random());
  return {type: appActionTypes.SET_ALERT, payload: { message, status, id, isAutoDeleted }};
};

export const clearAppAlert = (id: string | number): IAppClearAlert => {
  return {type: appActionTypes.CLEAR_ALERT, payload: id};
};

export const openModal = (template: JSX.Element): IAppOpenModal => {
  return { type: appActionTypes.OPEN_MODAL, payload: template };
};

export const closeModal = (): IAppCloseModal => {
  return { type: appActionTypes.CLOSE_MODAL };
};

export const getAllSubscriptionsProducts = (): IAppGetStripeToken => {
  return { type: appActionTypes.GET_ALL_SUBSCRIPTIONS_PRODUCTS };
};

export const setAllSubscriptionsProducts = (payload): IAppSetStripeToken => {
  return { type: appActionTypes.SET_ALL_SUBSCRIPTIONS_PRODUCTS, payload };
};

export const loadingStart = (): IAppLoadingStart => {
  return { type: appActionTypes.LOADING_START };
};


export default {
  setAppAlert,
  clearAppAlert,
  openModal,
  closeModal,
  getAllSubscriptionsProducts
}