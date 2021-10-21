import { IQuizResponse, IResponseQuiz, WithMessage } from '../../interfaces/quizes.interface';
import { call, put } from '@redux-saga/core/effects';
import { request } from '../../helpers/request.helper';
import {
  deleteQuizSuccess,
  fetchQuizStart,
  fetchSelectedQuizzesSuccess,
  fetchSelfQuizzesSuccess,
  getQuizStatsSuccess,
} from '../action-creators/quizActions';
import { routes } from '../../constants/routes';
import { setAppAlert } from '../action-creators/appActions';
import { statuses } from '../../constants/app';

export function* getSelfQuizzesSaga() {
  try {
    yield put(fetchQuizStart());
    const data: IResponseQuiz = yield call(() => request<IResponseQuiz>('/quizes', 'GET'));
    yield put(fetchSelfQuizzesSuccess(data.quizzes));
  } catch (e) {
    yield put(fetchSelfQuizzesSuccess([]));
  }
}

export function* getSelfQuizzesWithStatsSaga({ payload }) {
  try {
    const data: Omit<IQuizResponse, 'quizes'> = yield call(() => request('/quizes/statistics?quizId=' + (payload || ''), 'GET'));
    yield put(getQuizStatsSuccess({ id: payload, usersAnswers: data.usersAnswers }));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
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

export function* deleteQuizSaga({ payload }) {
  try {
    yield put(fetchQuizStart());
    const data: WithMessage & { deletedQuizId: string } = yield call(() => request('/quizes/remove', 'POST', { quizId: payload }));
    yield put(deleteQuizSuccess(data.deletedQuizId));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e) {
    yield put(setAppAlert(e.message, statuses.SUCCESS));
  }
}