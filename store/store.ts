import RootReducer from '@Slices';
import createSagaMiddleware from "@redux-saga/core";
import {configureStore} from "@reduxjs/toolkit";
import {rootWatcher} from "./watchers";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		thunk: false,
		immutableCheck: false,
		serializableCheck: false
	}).concat([sagaMiddleware])
});

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;