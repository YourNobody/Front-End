import {call, put} from '@redux-saga/core/effects';
import {allStoreInnerActions as InnerActions} from '@Slices';
import {allExternalActions as ExternalActions} from "@ActionCreators/externalActions";
import {LOCALSTORAGE_ACCESS_TOKEN_NAME, statuses} from '@Constants';
import {Subject} from "rxjs";
import AuthService from "../services/Auth.service";
import {
  IActivateResponse,
  ILoginResponse,
  ILogoutResponse,
  IRefreshResponse,
  IRegistrationResponse
} from "../store-interfaces/authService.interface";
import {AxiosResponse} from "axios";
import * as T from "@Interfaces/sagaActions.interface";

const loadingMessage = 'Wait for the end of the process, please';

export function* loginSaga({ loginData, callback }: ReturnType<T.TLoginUser>) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();

  yield put(InnerActions.userLoadingStart());

  yield put(ExternalActions.setAppAlert(loadingMessage, statuses.WARNING, { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }));
  const { data, status }: AxiosResponse<ILoginResponse> = yield call(AuthService.login(loginData));

  if (status < 400) {
    stream$.next({ readyToDelete: true});

    yield put(InnerActions.setUser(data.user));
    yield put(InnerActions.setAccessToken(data.accessToken));

    yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));

    if (callback) yield call(callback);
  } else {
    stream$.next({ readyToDelete: true});

    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
  stream$.complete();
}

export function* registerSaga({ registerData, callback }: ReturnType<T.TRegisterUser>) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();

  yield put(InnerActions.userLoadingStart());
  yield put(ExternalActions.setAppAlert(loadingMessage, statuses.WARNING, { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }));

  const { data, status }: AxiosResponse<IRegistrationResponse> = yield call(AuthService.register(registerData));

  if (status < 400) {
    stream$.next({ readyToDelete: true});

    yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));

    if (callback) yield call(callback);
  } else {
    stream$.next({ readyToDelete: true});
    stream$.complete();

    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
}

export function* logoutSaga({ callback }: ReturnType<T.TRegisterUser>) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();

  yield put(InnerActions.userLoadingStart());
  yield put(ExternalActions.setAppAlert(loadingMessage, statuses.WARNING, { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }));

  const { data, status }: AxiosResponse<ILogoutResponse> = yield call(AuthService.logout());

  if (status < 400) {
    if (callback) yield call(callback);

    yield put(InnerActions.logOut());
    yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));

    stream$.next({ readyToDelete: true});

    yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));
  } else {
    stream$.next({ readyToDelete: true});
    stream$.complete();

    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
}

export function* resetSaga({ email }: ReturnType<T.TResetUserPassword>) {
  // try {
  //   yield put(userDataFetchingStart());
  //   if (payload.email) {
  //     const data: IUserResetToken = yield call(() => request<IUserResetToken>('/auth/reset', 'POST', payload));
  //     yield put(userSetResetToken(data.resetToken, data.resetTokenExp));
  //     yield put(setAppAlert(data.message, statuses.SUCCESS));
  //   } else {
  //     const data: WithMessage = yield call(() => request<WithMessage>('/auth/reset/' + resetToken, 'POST', payload));
  //     yield put(setAppAlert(data.message, statuses.SUCCESS));
  //   }
  // } catch (e: any) {
  //   yield put(userDataFetchingEnd());
  //   yield put(setAppAlert(e.message, statuses.ERROR));
  // }
  //
  // if (status < 400) {
  //   yield put(userSetResetToken(data.resetToken, data.resetTokenExp));
  //   yield put(setAppAlert(data.message, statuses.SUCCESS));
  // } else {
  //   yield put(userDataFetchingEnd());
  //   yield put(setAppAlert(e.message, statuses.ERROR));
  // }
}

export function* activateSaga({ activationLink }: ReturnType<T.TActivateUserAccount>) {
  const stream$ = new Subject<{ readyToDelete: boolean }>();

  yield put(InnerActions.userLoadingStart());

  const { data, status }: AxiosResponse<IActivateResponse> = yield call(AuthService.activate(activationLink));

  if (status < 400) {
    if (data.isActivated) yield put(InnerActions.activateAccount());
    yield put(ExternalActions.setAppAlert(
      `${data.message}\nYour will be redirected in ${Math.round(data.redirectTime / 1000)} seconds`,
      statuses.SUCCESS,
      { isAutoDeleted: false, toDeleteStream: stream$, toDeleteAllBefore: true }
    ));
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
}

export function* checkAuthSaga({ callback }) {
  yield put(InnerActions.userLoadingStart());

  const { data, status }: AxiosResponse<IRefreshResponse> = yield call(AuthService.refresh());

  if (status < 400) {
    yield put(InnerActions.setUser(data.user));

    localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_NAME, data.accessToken);

    yield put(InnerActions.setAccessToken(data.accessToken));
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  if (callback) callback(data.accessToken ? true : false);

  yield put(InnerActions.setAuthCheck());

  yield put(InnerActions.userLoadingEnd());
}