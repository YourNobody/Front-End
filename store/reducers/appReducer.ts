import { appActionTypes, IAppActions, IAppState } from "../interfaces-reducers/appReducer.interface";

const initialAppState: IAppState = {
  alerts: [],
  newAlert: {
    id: null,
    isAutoDeleted: true
  },
  loading: false,
  modalTemplate: null
};

export const appReducer = (state: IAppState = initialAppState, action: IAppActions): IAppState => {
  switch (action.type) {
    case appActionTypes.SET_ALERT:
      if (!action.payload) return state;
      return {
        ...state,
        alerts: state.alerts.length >= 5
          ? [...state.alerts.slice(1), { message: action.payload.message, status: action.payload.status, id: action.payload.id }]
          : [...state.alerts, { message: action.payload.message, status: action.payload.status, id: action.payload.id }],
        newAlert: { ...state.newAlert, id: action.payload.id, isAutoDeleted: action.payload.isAutoDeleted }
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