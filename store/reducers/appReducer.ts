import { appActionTypes, IAppActions, IAppState } from "../interfaces-reducers/appReducer.interface";

const initialAppState: IAppState = {
  alerts: [],
  newAlert: {
    id: null,
    options: {
      isAutoDeleted: true,
      toDeleteAllBefore: false,
      toDeleteStream: null,
    }
  },
  loading: false,
  modalConfig: null,
  subscriptions: [],
  stripeToken: 'pk_test_51JpUsRHGtSgh6m0CCqMQpncG0FWtJrMw2t2L7RhH0TxmJmdp9JK1HyG1VyI3ONMDzlE0OlZVOwR7JD3ZQazKBuXJ00iREhwXp9'
};

export const appReducer = (state: IAppState = initialAppState, action: IAppActions): IAppState => {
  switch (action.type) {
    case appActionTypes.SET_ALERT:
      return {
        ...state,
        alerts: state.alerts.length >= 3
          ? [...state.alerts.slice(1), { message: action.payload.message, status: action.payload.status, id: action.payload.id }]
          : [...state.alerts, { message: action.payload.message, status: action.payload.status, id: action.payload.id }],
        newAlert: {
          ...state.newAlert,
          options: { ...action.payload.options },
          id: action.payload.id
        }
      };
    case appActionTypes.CLEAR_ALERT:
      return {...state, alerts: state.alerts.filter(alert => alert.id !== action.payload)};
    case appActionTypes.CLEAR_ALL_ALERTS:
      return {...state, alerts: []};
    case appActionTypes.OPEN_MODAL:
      return {...state, modalConfig: action.payload};
    case appActionTypes.OPEN_MODAL:
      return {...state, modalConfig: action.payload};
    case appActionTypes.CLOSE_MODAL:
      return {...state, modalConfig: null };
    case appActionTypes.SET_ALL_SUBSCRIPTIONS_PRODUCTS:
      return {...state, subscriptions: action.payload, loading: false };
    case appActionTypes.LOADING_START:
      return {...state, loading: true};
    default: return state;
  }
};