import { WithMessage } from '../../interfaces/quizes.interface';
import { request } from '../../helpers/request.helper';
import { call, put } from '@redux-saga/core/effects';
import { closeModal, setAppAlert } from '../action-creators/appActions';
import { statuses } from '../../constants/app';
import { IUserResetToken, IUserWithToken, WithQuizes } from '../../interfaces/user.interface';
import { fetchUserBegining, fetchUserError, fetchUserSuccess, userSetResetToken } from '../action-creators/userActions';

export function* loginSaga({ payload }) {
  try {
    yield put(fetchUserBegining());
    const data: IUserWithToken & WithMessage & WithQuizes = yield call(() => request<IUserWithToken & WithMessage & WithQuizes>('/auth/login', 'POST', payload));
    yield put(fetchUserSuccess({ user: data.user, token: data.token }));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(fetchUserError());
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* registerSaga({ payload }) {
  try {
    yield put(fetchUserBegining());
    const data: WithMessage = yield call(() => request<WithMessage>('/auth/register', 'POST', payload));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* logoutSaga({ payload }) {
  try {
    yield put(fetchUserBegining());
    const data: WithMessage = yield call(() => request('/auth/logout', 'POST'));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* resetSaga({ payload, resetToken }) {
  try {
    yield put(fetchUserBegining());
    if (payload.email) {
      const data: IUserResetToken = yield call(() => request<IUserResetToken>('/auth/reset', 'POST', payload));
      yield put(userSetResetToken(data.resetToken, data.resetTokenExp));
      yield put(setAppAlert(data.message, statuses.SUCCESS));
    } else {;
      const data: WithMessage = yield call(() => request<WithMessage>('/auth/reset/' + resetToken, 'POST', payload));
      yield put(setAppAlert(data.message, statuses.SUCCESS));
    }
  } catch (e: any) {
    throw yield put(setAppAlert(e.message, statuses.ERROR));
  }
}