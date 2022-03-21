import {
	name as AppReducerName,
	reducer as AppReducer,
	actions as AppActions,
} from "./appReducer";
import {
	name as QuizReducerName,
	reducer as QuizReducer,
	actions as QuizActions,
} from "./quizReducer";
import {
	name as UserReducerName,
	reducer as UserReducer,
	actions as UserActions
} from "./userReducer";

export const RootReducer = {
	[AppReducerName]: AppReducer,
	[UserReducerName]: UserReducer,
	[QuizReducerName]: QuizReducer
};

export default RootReducer;

export const allStoreInnerActions = {
	...AppActions,
	...QuizActions,
	...UserActions
};