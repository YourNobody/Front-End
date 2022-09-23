import { IUserState } from "../store-interfaces/userReducer.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IUserState = {
  user: null,
  accessToken: null,
  subscriptions: [],
  loading: false,
  isAuthChecked: false,
  clientSecret: null,
};

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
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },
    setAuthCheck: state => {
      state.isAuthChecked = true;
    }
  }
});