// import { statuses } from "@Constants";
// import {
//   appActionTypes,
//   IAppSetAlert,
//   IAppClearAlert,
//   IAppOpenModal,
//   IAppAlertOptions,
// } from '../store-interfaces/appReducer.interface';
// import
//
// export const setAppAlert = (message: string, status: statuses, options: IAppAlertOptions = {
//   isAutoDeleted: true,
//   toDeleteStream: null
// }): IAppSetAlert => {
//   const id = String(Date.now() * Math.random());
//   return {type: appActionTypes.SET_ALERT, payload: { message, status, id, options }};
// };
//
// export const clearAllAppAlerts = () => {
//   return {type: appActionTypes.CLEAR_ALL_ALERTS}
// }
//
// export const clearAppAlert = (id: string): IAppClearAlert => {
//   return {type: appActionTypes.CLEAR_ALERT, payload: id};
// };
//
// export const openModal = (config: {
//   actionFunc: (params?: any) => any;
//   actionButtonName: string;
//   closeButtonName: string;
//   modalQuestion: string;}): IAppOpenModal => {
//   return { type: appActionTypes.OPEN_MODAL, payload: config };
// };
//
// export const closeModal = () => {
//   return { type: appActionTypes.CLOSE_MODAL };
// };
//
// export const getAllSubscriptionsProducts = () => {
//   return { type: appActionTypes.GET_ALL_SUBSCRIPTIONS_PRODUCTS };
// };
//
// export const setAllSubscriptionsProducts = (payload) => {
//   return { type: appActionTypes.SET_ALL_SUBSCRIPTIONS_PRODUCTS, payload };
// };
//
// export const loadingStart = () => {
//   return { type: appActionTypes.LOADING_START };
// };
//
//
// export default {
//   setAppAlert,
//   clearAppAlert,
//   clearAllAppAlerts,
//   openModal,
//   closeModal,
//   getAllSubscriptionsProducts
// }