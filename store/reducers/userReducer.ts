import { getEmptyObject } from "../../helpers/clear.helper";
import { IUserActions, IUserReducer, IUserState, userTypes } from "../interfaces-reducers/userReducer.interface";

const initialState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    email: ''
  },
  isAuthenticated: false,
  loading: false
};

export const userReducer = (state = initialState, action: IUserActions): IUserState => {
  switch (action.type) {
    case userTypes.FETCH_USER:
      return {...state, loading: true};
    case userTypes.FETCH_USER_SUCCESS:
      return {...state, loading: false, user: action.payload, isAuthenticated: true};
    case userTypes.USER_LOGOUT:
      return {...state, isAuthenticated: false, user: getEmptyObject<IUserReducer>(state.user)};
    case userTypes.FETCH_USER_ERROR:
      return {...state, loading: false};
    default: return state;
  }
};