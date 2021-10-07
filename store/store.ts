import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/all";
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOCALSTORAGE_USER_DATA_NAME } from "../constants/app";
import { IUserReducer, IUserState } from "./interfaces-reducers/userReducer.interface";
import { getEmptyObject } from "../helpers/custom.helper";
import createSagaMiddleware from "@redux-saga/core";

const preloadState = () => {  
    const userData: { user: IUserReducer, token: string } = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
    const userInitial: IUserState = {
      user: getEmptyObject<IUserReducer>({ id: '', nickname: '', email: '', quizes: [] }),
      isAuthenticated: false,
      loading: false
    };

    if (userData && userData.token) {
      return {
        ...userInitial,
        user: {
          id: userData.user.id,
          nickname: userData.user.nickname,
          email: userData.user.email,
          quizes: userData.user.quizes
        },
        isAuthenticated: !!userData.token,
      };
    }

    return userInitial;
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, {
  user: preloadState()
}, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))); 