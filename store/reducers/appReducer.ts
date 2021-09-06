import { appActionTypes, IAppActions, IAppState } from "../interfaces-reducers/appReducer.interface";

const initialAppState: IAppState = {
  alerts: [],
  newAlertId: null,
  loading: false,
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
    default: return state;
  }
};