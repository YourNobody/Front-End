import { appActionTypes, IAppActions, IAppState } from "../interfaces-reducers/appReducer.interface";

const initialAppState: IAppState = {
  alerts: [],
  newAlertId: null,
  loading: false,
  modalTemplate: null
};

export const appReducer = (state: IAppState = initialAppState, action: IAppActions): IAppState => {
  switch (action.type) {
    case appActionTypes.SET_ALERT:
      if (!action.payload) return state;
      return {
        ...state,
        alerts: [...state.alerts, { message: action.payload.message, status: action.payload.status, id: action.payload.id}],
        newAlertId: action.payload.id
      };
    case appActionTypes.CLEAR_ALERT:
      if (!action.payload) return state;
      return {...state, alerts: state.alerts.filter(alert => alert.id !== action.payload)};
    case appActionTypes.OPEN_MODAL:
      if (!action.payload) return state;
      return {...state, modalTemplate: action.payload} ;
    case appActionTypes.CLOSE_MODAL:
      return {...state, modalTemplate: null };
    default: return state;
  }
};