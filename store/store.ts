import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/all";
import { composeWithDevTools } from 'redux-devtools-extension';
import { IUserReducer } from "./interfaces-reducers/userReducer.interface";
import { getEmptyObject } from "../helpers/custom.helper";

const preloadState = () => {  
  if (localStorage.getItem('user') && localStorage.getItem('user') !== 'null') {    
    const user: IUserReducer = JSON.parse(localStorage.getItem('user'));
    const { id, firstName, lastName, email, questions } = user;
    if (!id && !email) return {
      user: getEmptyObject({ ...user }),
      isAuthenticated: false,
      loading: false,
    };
    return {
      user: {
        id, firstName, lastName, email, questions
      },
      isAuthenticated: true,
      loading: false,
    };
  }
};

export const store = createStore(rootReducer, {
  user: preloadState()
}, composeWithDevTools(applyMiddleware(thunk)));