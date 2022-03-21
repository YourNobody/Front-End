import {createSagaAction} from "@Helpers";
import {SagaActionsTypes} from "./sagaActionsTypes";
import * as T from "@Interfaces/sagaActions.interface";
import {TUserChangeOption} from "@Interfaces/user.interface";

const { User, Quiz, Auth } = SagaActionsTypes;

export const SagaActions = {
	User: {
		changeUserAvatar: createSagaAction<T.TChangeUserAvatar>(User.CHANGE_AVATAR, (avatarBase64: string) => ({ avatarBase64 })),
		changeUserInfo: createSagaAction<T.TChangeUserInfo>(User.CHANGE_INFO, (changeOption: TUserChangeOption, formData) => ({ formData, changeOption })),
		activateUserAccount: createSagaAction<T.TActivateUserAccount>(User.ACTIVATE_ACCOUNT, (activationLink: string) => ({ activationLink }))
	},
	Auth: {
		registerUser: createSagaAction<T.TRegisterUser>(Auth.REGISTER_USER, (registerData, callback?) => ({ registerData, callback })),
		loginUser: createSagaAction<T.TLoginUser>(Auth.LOGIN_USER , (loginData, callback) => ({ loginData, callback})),
		logoutUser: createSagaAction<T.TLogoutUser>(Auth.LOGOUT_USER, (callback) => ({ callback })),
		checkUserAuth: createSagaAction<T.TCheckUserAuth>(Auth.CHECK_AUTH),
		resetUserPassword: createSagaAction<T.TResetUserPassword>(Auth.RESET_USER_PASSWORD, (email: string) => ({ email }))
	},
	Quiz: {
		getQuiz: createSagaAction<T.TGetQuiz>(Quiz.GET_QUIZ, (quizType, quizOrderNumber, title) => ({
			quizType,
			quizOrderNumber,
			title
		})),
		getQuizWithStats: createSagaAction<T.TGetSelfQuizWithStats>(Quiz.GET_QUIZ_STATS, (orderQuizNumber) => ({ orderQuizNumber })),
		getQuizzes: createSagaAction<T.TGetQuizzes>(Quiz.GET_QUIZZES, (quizzesType) => ({ quizzesType })),
		getSelfQuizzes: createSagaAction<T.TGetSelfQuizzes>(Quiz.GET_SELF_QUIZZES),
		deleteQuiz: createSagaAction<T.TDeleteQuiz>(Quiz.DELETE_QUIZ, (quizId) => ({ quizId })),
		saveUserAnswer: createSagaAction<T.TSaveUserAnswer>(Quiz.SAVE_QUIZ_ANSWER, (quizId, answerData, callback) => ({ quizId, answerData, callback })),
		createQuiz: createSagaAction<T.TCreateQuiz>(Quiz.CREATE_QUIZ, (quizData, callback?) => ({ quizData, callback }))
	}
};

export const allSagaActions = {
	...SagaActions.User,
	...SagaActions.Auth,
	...SagaActions.Quiz
};