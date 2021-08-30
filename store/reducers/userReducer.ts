import { IUserAction, IUserState, userTypes } from "../reducers.interface";

const initialState: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    isAuthenticated: false,
  },
  error: null,
  loading: false
};

export const userReducer = (state = initialState, action: IUserAction): IUserState => {
  switch (action.type) {
    case userTypes.FETCH_USER:
      return {...state, loading: true, error: null};
    case userTypes.FETCH_USER_SUCCESS:
      return {...state, loading: false, error: null, user: action.payload};
    case userTypes.FETCH_USER_ERROR:
      return {...state, loading: false, error: action.payload};
    case userTypes.CLEAR_ERROR:
      return {...state, error: null};
    default: return state;
  }
};