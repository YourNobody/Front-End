import { call, put } from '@redux-saga/core/effects'
import {allStoreInnerActions as InnerActions} from '@Slices';
import {allExternalActions as ExternalActions} from "@ActionCreators/externalActions";
import * as T from '@Interfaces/sagaActions.interface';
import { statuses } from '../../constants/app'
import {AxiosResponse} from "axios";
import ProfileService from "../services/Profile.service";
import {IProfileChangeAvatarResponse, IProfileChangeResponse} from "../store-interfaces/profileService.interface";
import {PaymentMethodResult} from '@stripe/stripe-js';
import {IClientTokenDataFromStripe} from '@Interfaces/http.interface';
import AppService from '../services/Subscription.service';
import {sagaAsyncWrap} from '@Helpers';

const subId = 'prod_KWYsSUh0MdfBz6';

export function* changeSaga({ formData, changeOption }: ReturnType<T.TChangeUserInfo>) {
  yield put(InnerActions.userLoadingStart());

  const { data, status }: AxiosResponse<IProfileChangeResponse>= yield call(ProfileService.changeInfo(changeOption, formData));

  if (status < 400) {
    yield put(InnerActions.setUser(data.user));
    yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
}

export function* changeAvatar({ avatarBase64 }: ReturnType<T.TChangeUserAvatar>) {
  yield put(InnerActions.userLoadingStart());

  const { data, status }: AxiosResponse<IProfileChangeAvatarResponse>= yield call(ProfileService.changeUserAvatar(avatarBase64));

  if (status < 400) {
    yield put(InnerActions.setUserAvatar(data.avatarUrl));
    yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
}

export function* getSelfSubscriptions() {
  yield put(InnerActions.userLoadingStart());

  const { data, status }: AxiosResponse<any>= yield call(ProfileService.getUserSubscriptions());

  if (status < 400) {
    yield put(InnerActions.setSubscriptions(data.subscriptions))
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.userLoadingEnd());
}

export function* cancelSubscriptionSaga({ payload }) {
  yield put(InnerActions.userLoadingEnd());

  // const { data, status }: AxiosResponse<any> = yield call(() => request('/profile/payment/sub/cancel', 'POST', { id: payload }));

  // if (status < 400) {
    // yield put(setUserSubscriptions(data.subscriptions));
  //   yield put(setAppAlert(data.message, statuses.SUCCESS));
  // } else {
  //   yield put(setAppAlert(data.message, statuses.ERROR));
  // }

  yield put(InnerActions.userLoadingEnd());
}