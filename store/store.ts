import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/all";
import { composeWithDevTools } from 'redux-devtools-extension';
import { LOCALSTORAGE_USER_DATA_NAME } from "../constants/app";
import { IUserReducer, IUserState } from "./interfaces-reducers/userReducer.interface";
import { getEmptyObject } from "../helpers/custom.helper";

const preloadState = () => {  
    const userData: IUserReducer & { token: string } = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_DATA_NAME));
    const userInitial: IUserState = {
      user: getEmptyObject<IUserReducer>({ id: '', firstName: '', lastName: '', email: '', questions: [] }),
      isAuthenticated: false,
      loading: false
    };

    if (userData && userData.token) {
      return {
        ...userInitial,
        user: {
          id: userData?.id,
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          email: userData?.email,
          questions: userData?.questions
        },
        isAuthenticated: !!userData.token,
      };
    }

    return userInitial;
};

export const store = createStore(rootReducer, {
  user: preloadState()
}, composeWithDevTools(applyMiddleware(thunk))); 