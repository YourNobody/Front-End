import { statuses } from "../../constants/app";
import { appActionTypes, IAppSetAlert, IAppClearAlert, IAppOpenModal, IAppCloseModal } from "../interfaces-reducers/appReducer.interface";

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

export default {
  setAppAlert,
  clearAppAlert,
  openModal,
  closeModal
}