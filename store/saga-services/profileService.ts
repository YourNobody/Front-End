import { call, put } from '@redux-saga/core/effects'
import {allStoreInnerActions as InnerActions} from '@Slices';
import {allExternalActions as ExternalActions} from "@ActionCreators/externalActions";
import * as T from '@Interfaces/sagaActions.interface';
import { statuses } from '../../constants/app'
import {AxiosResponse} from "axios";
import ProfileService from "../services/Profile.service";
import {IProfileChangeAvatarResponse, IProfileChangeResponse} from "../store-interfaces/profileService.interface";

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

export function* getAvailableSubscriptionsSaga() {
  yield put(InnerActions.userLoadingStart());
  const { data, status }: AxiosResponse<any> = yield call(ProfileService.getSubscriptions);

  // if (status < 400) {
  //   yield put(setAllSubscriptionsProducts(data.subscriptions));
  //   yield put(setUserSubscriptions(data.userSubscriptions));
  //   yield put(setAppAlert(data.message, statuses.SUCCESS));
  // } else {
  //   yield put(userDataFetchingEnd());
  //   yield put(setAppAlert(data.message, statuses.ERROR));
  // }
}

export function* getClientSecretAndSubscribeSaga({ payload: { priceId, stripe, method, email } }) {
  // try {
  //   const result: PaymentMethodResult = yield call(() => stripe.createPaymentMethod(method));
  //   if (result.error && result.error.message) throw new Error(result.error.message);
  //   else {
  //     const res: {
  //       client_secret: string;
  //       status: string;
  //       id: string;
  //     } = yield call(() => request('/profile/payment/sub', 'POST', { payment_method: result.paymentMethod.id, email, priceId }));
  //     const {client_secret, status, id} = res;
  //     let payment = null;
  //     if (status === 'requires_action') {
  //       payment = yield call(() => stripe.confirmCardPayment(client_secret));
  //       if (payment.error) throw new Error('Subscription payment failed. Try later');
  //     }
  //     if (status === 'succeeded' || !payment.error) {
  //       const data: { confirmed: boolean; subscriptions?: any } & WithMessage =  yield call(() => request('/profile/payment/sub/confirm', 'POST', { id }));
  //       if (data.confirmed) {
  //         yield put(setAppAlert('Subscription has been paid successfully', statuses.SUCCESS));
  //         yield put(setUserSubscriptions(data.subscriptions));
  //       } else yield put(setAppAlert(data.message, statuses.SUCCESS));
  //     }
  //   }
  // } catch (e: any) {
  //   yield put(setAppAlert(e.message, statuses.ERROR));
  // }
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