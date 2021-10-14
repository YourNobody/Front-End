import { WithMessage } from '../../interfaces/quizes.interface'
import { request } from '../../helpers/request.helper'
import { call, put } from '@redux-saga/core/effects'
import { appActionTypes } from '../interfaces-reducers/appReducer.interface'
import { setAppAlert } from '../action-creators/appActions'
import { statuses } from '../../constants/app'
import { IUserWithToken, WithQuizes } from '../../interfaces/user.interface'
import { fetchUserBegining, fetchUserError, fetchUserSuccess } from '../action-creators/userActions'

export function* loginSaga({ payload }) {
    console.log('fefefeffe')
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
    const data: WithMessage = yield call(() => request<WithMessage>('/auth/register', 'POST', payload));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* resetSaga({ payload }) {
  try {
    const data: WithMessage = yield call(() => request<WithMessage>('/auth/reset', 'POST', payload));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}