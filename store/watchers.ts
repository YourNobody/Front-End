import {all, takeEvery} from '@redux-saga/core/effects';
import { userTypes } from './interfaces-reducers/userReducer.interface';
import { loginSaga, logoutSaga, registerSaga, resetSaga } from './services/authService';
import { quizActionTypes } from './interfaces-reducers/quizReducer.interface';
import {
  createQuizSaga,
  deleteQuizSaga,
  getSelectedQuizzesSaga,
  getSelfQuizzesSaga,
  getSelfQuizzesWithStatsSaga, saveQuizAnswerSaga,
} from './services/quizService';
import {
  cancelSubscriptionSaga,
  changeSaga,
  getAvailableSubscriptionsSaga,
  getClientSecretAndSubscribeSaga,
} from './services/profileService'
import { appActionTypes } from './interfaces-reducers/appReducer.interface';

export function* rootWatcher() {
  yield all([
    authWatcher(),
    quizzesWatcher(),
    profileWatcher()
  ]);
}

function* profileWatcher() {
  const { CHANGE_INFO, GET_CLIENT_SECRET, CANCEL_SUBSCRIPTION } = userTypes as any;
  const { GET_ALL_SUBSCRIPTIONS_PRODUCTS } = appActionTypes as any;
  yield takeEvery(CHANGE_INFO, changeSaga);
  yield takeEvery(GET_CLIENT_SECRET, getClientSecretAndSubscribeSaga);
  yield takeEvery(GET_ALL_SUBSCRIPTIONS_PRODUCTS, getAvailableSubscriptionsSaga);
  yield takeEvery(CANCEL_SUBSCRIPTION, cancelSubscriptionSaga);
}

function* authWatcher() {
  const { REGISTER_USER, RESET_USER, LOGIN_USER, USER_LOGOUT } = userTypes as any;
  yield takeEvery(REGISTER_USER, registerSaga);
  yield takeEvery(LOGIN_USER, loginSaga);
  yield takeEvery(RESET_USER, resetSaga);
  yield takeEvery(USER_LOGOUT, logoutSaga);
}

function* quizzesWatcher() {
  const { FETCH_SELF_QUIZZES, FETCH_SELECTED_QUIZZES, DELETE_QUIZ, GET_QUIZ_STATS, SAVA_QUIZ_ANSWER, CREATE_QUIZ } = quizActionTypes as any;
  yield takeEvery(FETCH_SELF_QUIZZES, getSelfQuizzesSaga);
  yield takeEvery(FETCH_SELECTED_QUIZZES, getSelectedQuizzesSaga);
  yield takeEvery(DELETE_QUIZ, deleteQuizSaga);
  yield takeEvery(GET_QUIZ_STATS, getSelfQuizzesWithStatsSaga);
  yield takeEvery(SAVA_QUIZ_ANSWER, saveQuizAnswerSaga);
  yield takeEvery(CREATE_QUIZ, createQuizSaga);
}