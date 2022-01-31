import { WithMessage } from '../../interfaces/quizes.interface';
import { request } from '../../helpers/request.helper';
import { call, put } from '@redux-saga/core/effects';
import { closeModal, setAppAlert } from '../action-creators/appActions';
import { statuses } from '../../constants/app';
import { IUserResetToken, IUserWithToken, WithQuizes } from '../../interfaces/user.interface';
import {
  fetchUserBeginning,
  fetchUserEnding,
  fetchUserError,
  fetchUserSuccess, userLogOutSuccessful,
  userSetResetToken
} from '../action-creators/userActions';
import {Subject} from "rxjs";

const loadingMessage = 'Wait for the end of the process, please';

export function* loginSaga({ payload, redirectFunc }) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();
  try {
    yield put(fetchUserBeginning());
    yield put(setAppAlert(loadingMessage, statuses.WARNING, { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }));
    const data: IUserWithToken & WithMessage & WithQuizes = yield call(() => request<IUserWithToken & WithMessage & WithQuizes>('/auth/login', 'POST', payload));
    yield put(fetchUserSuccess({ user: data.user, token: data.token }));
    stream$.next({ readyToDelete: true});
    yield put(setAppAlert(data.message, statuses.SUCCESS));
    if (redirectFunc) yield call(redirectFunc);
  } catch (e: any) {
    stream$.next({ readyToDelete: true});
    stream$.complete();
    yield put(fetchUserError());
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* registerSaga({ payload, redirectFunc }) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();
  try {
    yield put(fetchUserBeginning());
    yield put(setAppAlert(loadingMessage, statuses.WARNING, { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }));
    const data: WithMessage = yield call(() => request<WithMessage>('/auth/register', 'POST', payload));
    yield put(fetchUserEnding())
    stream$.next({ readyToDelete: true});
    yield put(setAppAlert(data.message, statuses.SUCCESS));
    if (redirectFunc) yield call(redirectFunc);
  } catch (e: any) {
    stream$.next({ readyToDelete: true});
    stream$.complete();
    yield put(fetchUserError());
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* logoutSaga({ redirectFunc }) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();
  try {
    yield put(fetchUserBeginning());
    yield put(setAppAlert(loadingMessage, statuses.WARNING, { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }));
    const data: WithMessage = yield call(() => request('/auth/logout', 'POST'));
    if (redirectFunc) yield call(redirectFunc);
    yield put(userLogOutSuccessful());
    yield put(fetchUserEnding());
    stream$.next({ readyToDelete: true});
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    stream$.next({ readyToDelete: true});
    stream$.complete();
    yield put(fetchUserError());
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* resetSaga({ payload, resetToken }) {
  try {
    yield put(fetchUserBeginning());
    if (payload.email) {
      const data: IUserResetToken = yield call(() => request<IUserResetToken>('/auth/reset', 'POST', payload));
      yield put(userSetResetToken(data.resetToken, data.resetTokenExp));
      yield put(setAppAlert(data.message, statuses.SUCCESS));
    } else {
      const data: WithMessage = yield call(() => request<WithMessage>('/auth/reset/' + resetToken, 'POST', payload));
      yield put(setAppAlert(data.message, statuses.SUCCESS));
    }
  } catch (e: any) {
    yield put(fetchUserError());
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}