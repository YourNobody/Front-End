import { IUserState } from "../store-interfaces/userReducer.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IUserState = {
  user: null,
  accessToken: null,
  subscriptions: null,
  loading: false,
  isAuthChecked: false,
  clientSecret: null,
};

// export const userReducer = (state = initialState, action: IUserActions): IUserState => {
//   switch (action.type) {
//     case userTypes.FETCH_USER_BEGINNING:
//       return {...state, loading: true};
//     case userTypes.FETCH_USER_ENDING:
//       return {...state, loading: false};
//     case userTypes.FETCH_USER_SUCCESS:
//       return {...state, user: { ...state.user, ...action.payload.user }, accessToken: action.payload.accessToken};
//     case userTypes.CHANGE_INFO_SUCCESS:
//       return {...state, user: { ...state.user, ...action.payload }};
//     case userTypes.USER_LOGOUT_SUCCESSFUL:
//       return {...state, user: null, accessToken: null};
//     case userTypes.SET_CLIENT_SECRET:
//       return {...state, clientSecret: action.payload};
//     case userTypes.SET_SUBSCRIPTIONS:
//       return {...state, user: { ...state.user,  subscriptions: action.payload }};
//     case userTypes.ACTIVATE_ACCOUNT_SUCCESS:
//       return {...state, user: { ...state.user, isActivated: true }};
//     case userTypes.CHECK_AUTH_SUCCESS:
//       return {...state, user: { ...state.user, ...action.payload.user }, accessToken: action.payload.accessToken};
//     default: return state;
//   }
// };

// const sagaActions = {
//   getSubscription() {},
//   activateAccount() {},
//   changeInfo() {},
//   checkAuth() {},
//   startLogOut() {},
//   login() {},
//   register: ({ email, nickname, password, confirm }) => {
//     return { payload: { email, nickname, password, confirm } };
//   }
// };

export const name = 'user';
export const { reducer, actions } = createSlice({
  name, initialState,
  reducers: {
    userLoadingStart: state => {
      state.loading = true;
    },
    userLoadingEnd: state => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserAvatar: (state, action: PayloadAction<string>) => {
      state.user.avatar = action.payload;
    },
    logOut: state => {
      state.user = null;
      state.accessToken = null;
    },
    activateAccount: state => {
      state.user.isActivated = true;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setSubscription: (state, action) => {
      state.subscriptions = action.payload;
    },
    setAuthCheck: state => {
      state.isAuthChecked = true;
    }
  }
});