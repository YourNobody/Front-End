import {generateTypes} from "@Helpers";

export const SagaActionsTypes = {
	User: generateTypes('userSaga/',
		'CHANGE_INFO',
		'ACTIVATE_ACCOUNT',
		'CHANGE_AVATAR',
		'GET_SELF_SUBSCRIPTIONS',
		'CANCEL_SUBSCRIPTION'
	),
	Quiz: generateTypes('quizSaga/',
		'GET_SELF_QUIZZES',
		'GET_QUIZZES',
		'DELETE_QUIZ',
		'GET_QUIZ_STATS',
		'SAVE_QUIZ_ANSWER',
		'CREATE_QUIZ',
		'GET_QUIZ'
	),
	Auth: generateTypes('authSaga/',
		'REGISTER_USER',
		'LOGIN_USER',
		'RESET_USER_PASSWORD',
		'LOGOUT_USER',
		'CHECK_AUTH',
	),
	App: generateTypes('appSaga/',
		'GET_ALL_AVAILABLE_SUBSCRIPTIONS_PRODUCTS',
		'GET_CLIENT_SECRET_AND_SUBSCRIBE_USER'
	)
};