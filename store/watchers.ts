import {all, takeEvery} from '@redux-saga/core/effects';
import * as AuthSagas from './saga-services/authService';
import * as QuizSagas from './saga-services/quizService';
import * as ProfileSagas from './saga-services/profileService';
import * as AppSagas from './saga-services/appService';
import {SagaActionsTypes} from "@ActionCreators/sagaActionsTypes";

const { User, Auth, Quiz, App } = SagaActionsTypes as any;

function* profileWatcher() {
  yield takeEvery(User.CHANGE_INFO, ProfileSagas.changeSaga);
  yield takeEvery(User.CHANGE_AVATAR, ProfileSagas.changeAvatar);
  yield takeEvery(User.GET_CLIENT_SECRET, ProfileSagas.getClientSecretAndSubscribeSaga);
  yield takeEvery(User.CANCEL_SUBSCRIPTION, ProfileSagas.cancelSubscriptionSaga);
  yield takeEvery(User.GET_SELF_SUBSCRIPTIONS, ProfileSagas.getSelfSubscriptions)
}

function* authWatcher() {
  yield takeEvery(Auth.REGISTER_USER, AuthSagas.registerSaga);
  yield takeEvery(Auth.LOGIN_USER, AuthSagas.loginSaga);
  yield takeEvery(Auth.RESET_USER_PASSWORD, AuthSagas.resetSaga);
  yield takeEvery(Auth.LOGOUT_USER, AuthSagas.logoutSaga);
  yield takeEvery(Auth.CHECK_AUTH, AuthSagas.checkAuthSaga);
  yield takeEvery(User.ACTIVATE_ACCOUNT, AuthSagas.activateSaga);
}

function* quizzesWatcher() {
  yield takeEvery(Quiz.GET_SELF_QUIZZES, QuizSagas.getSelfQuizzesSaga);
  yield takeEvery(Quiz.GET_QUIZZES, QuizSagas.getSelectedQuizzesSaga);
  yield takeEvery(Quiz.GET_QUIZ, QuizSagas.getQuizSaga);
  yield takeEvery(Quiz.DELETE_QUIZ, QuizSagas.deleteQuizSaga);
  yield takeEvery(Quiz.GET_QUIZ_STATS, QuizSagas.getSelfQuizWithStats);
  yield takeEvery(Quiz.SAVE_QUIZ_ANSWER, QuizSagas.saveQuizAnswerSaga);
  yield takeEvery(Quiz.CREATE_QUIZ, QuizSagas.createQuizSaga);
}

function* appWatcher() {
  yield takeEvery(App.GET_ALL_AVAILABLE_SUBSCRIPTIONS_PRODUCTS, AppSagas.getAllAvailableSubscriptionsProducts);
}

export function* rootWatcher() {
  yield all([
    authWatcher(),
    quizzesWatcher(),
    profileWatcher(),
    appWatcher()
  ]);
}