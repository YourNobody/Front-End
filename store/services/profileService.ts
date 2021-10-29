import { call, put } from '@redux-saga/core/effects'
import {
  fetchUserBegining,
  fetchUserSuccess,
  payForSubscriptionSuccess,
  setClientSecret,
} from '../action-creators/userActions'
import { request } from '../../helpers/request.helper'
import { setAppAlert, setStripeToken } from '../action-creators/appActions'
import { statuses } from '../../constants/app'
import { IUserWithToken } from '../../interfaces/user.interface'
import { WithMessage } from '../../interfaces/quizes.interface'

export function* changeSaga({ payload }) {
  try {
    yield put(fetchUserBegining());
    const { token, user, message }: IUserWithToken & WithMessage = yield call(() => request('/profile/change', 'POST', payload));
    yield put(fetchUserSuccess({ token, user }));
    yield put(setAppAlert(message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* getStripeTokenSaga() {
  try {
    const data: { client_stripe_token: string } & WithMessage = yield call(() => request('/profile/stripe', 'GET'));
    yield put(setStripeToken(data.client_stripe_token));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* getClientSecretSaga({ payload }) {
  try {
    const data: { client_secret: string } & WithMessage = yield call(() => request('/profile/payment', 'POST', { email: payload }));
    yield put(setClientSecret(data.client_secret));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* payForSubscriptionSaga({ payload: { stripe, clientSecret, method } }) {
  try {
    const data: { isSucceed: string } & WithMessage = yield call(() => stripe.confirmCardPayment(clientSecret, method));
    yield put(payForSubscriptionSuccess(data.isSucceed));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}