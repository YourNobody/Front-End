import { all } from '@redux-saga/core/effects'
import { userTypes } from './interfaces-reducers/userReducer.interface'
import { loginSaga, registerSaga, resetSaga } from './services/authService'
import * as Eff from 'redux-saga/effects'
import { quizActionTypes } from './interfaces-reducers/quizReducer.interface'
import {
  deleteQuizSaga,
  getSelectedQuizzesSaga,
  getSelfQuizzesSaga,
  getSelfQuizzesWithStatsSaga,
} from './services/quizService';
import { deleteQuiz } from './action-creators/quizActions'

const takeEvery: any = Eff.takeEvery;

export function* rootWatcher() {
  yield all([
    authWatcher(),
    quizzesWatcher()
  ])
}

function* authWatcher() {
  const { REGISTER_USER, RESET_USER, LOGIN_USER } = userTypes;
  yield takeEvery(REGISTER_USER, registerSaga);
  yield takeEvery(LOGIN_USER, loginSaga);
  yield takeEvery(RESET_USER, resetSaga);
}

function* quizzesWatcher() {
  const { FETCH_SELF_QUIZZES, FETCH_SELECTED_QUIZZES, DELETE_QUIZ, GET_QUIZ_STATS } = quizActionTypes;
  yield takeEvery(FETCH_SELF_QUIZZES, getSelfQuizzesSaga);
  yield takeEvery(FETCH_SELECTED_QUIZZES, getSelectedQuizzesSaga);
  yield takeEvery(DELETE_QUIZ, deleteQuizSaga);
  yield takeEvery(GET_QUIZ_STATS, getSelfQuizzesWithStatsSaga);
}