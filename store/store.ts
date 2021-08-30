import { createStore } from "redux";
import { rootReducer } from "./reducers/all";

export const store = createStore(rootReducer);