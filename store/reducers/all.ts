import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer
});

export type RootState = ReturnType<typeof rootReducer>;