import { IQuizResponse, IResponseQuiz } from '../../interfaces/quizes.interface'
import { call, put } from '@redux-saga/core/effects'
import { request } from '../../helpers/request.helper'
import { fetchQuizStart, fetchSelectedQuizzesSuccess, fetchSelfQuizzesSuccess } from '../action-creators/quizActions'
import { routes } from '../../constants/routes'
import { setAppAlert } from '../action-creators/appActions'
import { statuses } from '../../constants/app'

export function* getSelfQuizzesSaga() {
  try {
    yield put(fetchQuizStart());
    const data: IResponseQuiz = yield call(() => request<IResponseQuiz>('/quizes', 'GET'));
    yield put(fetchSelfQuizzesSuccess(data.quizzes));
  } catch (e) {
    yield put(fetchSelfQuizzesSuccess([]));
  }
}

export function* getSelectedQuizzesSaga({ payload }) {
  try {
    yield put(fetchQuizStart());
    const data: IQuizResponse = yield call(() => request<IQuizResponse>(routes.QUIZES.ROOT, 'POST', { type: payload }));
    yield put(fetchSelectedQuizzesSuccess(data.quizes));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e) {
    yield put(setAppAlert(e.message, statuses.SUCCESS));
  }
}