import { call, put } from '@redux-saga/core/effects';
import { allStoreInnerActions as InnerActions } from '@Slices';
import { allExternalActions as ExternalActions } from "@ActionCreators/externalActions";
import { AxiosResponse } from 'axios';
import SubscriptionService from '../services/Subscription.service';
import { statuses } from '@Constants';
import * as T from '@Interfaces/sagaActions.interface';
import {PaymentMethodResult} from '@stripe/stripe-js';
import {IClientTokenDataFromStripe} from '@Interfaces/http.interface';
import {WithMessage} from '@Interfaces/quizes.interface';

export function* getAllAvailableSubscriptionsProducts() {
  yield put(InnerActions.appLoadingStart());
  const { data, status }: AxiosResponse<any> = yield call(SubscriptionService.getSubscriptionsProducts());

  if (status < 400) {
    yield put(InnerActions.setAllAvailableSubscriptionProducts(data.products));
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.appLoadingEnd());
}

export function* getClientSecretAndSubscribeStripeSaga({ stripeProcessPaymentConfig }: ReturnType<T.TStripeSubscriptionProcess>) {
  const { stripe, priceId, method } = stripeProcessPaymentConfig;

  const result: PaymentMethodResult = yield call(() => stripe.createPaymentMethod(method));

  if (result.error && result.error.message) throw new Error(result.error.message);

  const { data: preconfirmedData, status: responseStatus }: AxiosResponse<IClientTokenDataFromStripe & WithMessage> = yield call(SubscriptionService.beforeConfirmPayment({
    priceId, payment_method: result.paymentMethod.id
  }));

  if (responseStatus >= 400) throw new Error(preconfirmedData.message || 'Error');

  // let payment = null;
  //
  // if (preconfirmedData.status === 'requires_action') {
  //   payment = yield call(() => stripe.confirmCardPayment(preconfirmedData.client_secret));
  //   if (payment.error) throw new Error('Subscription payment failed. Try later');
  // }
  //
  // if (preconfirmedData.status !== 'succeeded' || payment.error) throw new Error(payment.error.message)
  //
  // const { data: confirmationData, status }: AxiosResponse<any> = yield call(SubscriptionService.confirmPayment(preconfirmedData.id));
  //
  // if (status >= 400) throw new Error(confirmationData.message || 'Error confirm payment');
  //
  // if (confirmationData.confirmed) {
  //   yield put(ExternalActions.setAppAlert('Subscription has been paid successfully', statuses.SUCCESS));
  //   // yield put(InnerActions.(data.subscriptions));
  // } else yield put(ExternalActions.setAppAlert(confirmationData.message, statuses.SUCCESS));
}