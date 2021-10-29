import { getEmptyObject } from "../../helpers/custom.helper";
import { IUserActions, IUserReducer, IUserState, userTypes } from "../interfaces-reducers/userReducer.interface";

const initialState: IUserState = {
  user: {
    nickname: '',
    email: '',
    id: '',
  },
  isAuthenticated: false,
  loading: false,
  resetToken: null,
  hasSubscription: false,
  clientSecret: null
};

export const userReducer = (state = initialState, action: IUserActions): IUserState => {
  switch (action.type) {
    case userTypes.FETCH_USER_BEGINING:
      return {...state, loading: true};
    case userTypes.FETCH_USER_SUCCESS:
      return {...state, user: action.payload, isAuthenticated: true, loading: false};
    case userTypes.USER_LOGOUT:
      return {...state, user: getEmptyObject<IUserReducer>(state.user), isAuthenticated: false, loading: false};
    case userTypes.FETCH_USER_ERROR:
      return {...state, loading: false};
    case userTypes.SET_RESET_TOKEN:
      return {...state, resetToken: action.payload, loading: false};
    case userTypes.DELETE_RESET_TOKEN:
      return {...state, resetToken: null, loading: false};
    case userTypes.SET_CLIENT_SECRET:
      return {...state, clientSecret: action.payload};
    case userTypes.PAY_FOR_SUBSCRIPTION_SUCCESS:
      return {...state, hasSubscription: action.payload};
    default: return state;
  }
};