import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { userReducer } from "./userReducer";
import { quizReducer } from "./quizReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  quiz: quizReducer
});

export type RootState = ReturnType<typeof rootReducer>;