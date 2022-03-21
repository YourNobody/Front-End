import {generateTypes} from "@Helpers";

export const SagaActionsTypes = {
	User: generateTypes('userSaga/',
		'CHANGE_INFO',
		'GET_CLIENT_SECRET',
		'GET_ALL_SUBSCRIPTIONS_PRODUCTS',
		'CANCEL_SUBSCRIPTION',
		'ACTIVATE_ACCOUNT',
		'CHANGE_AVATAR'
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
	)
};