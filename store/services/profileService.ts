import { call, put } from '@redux-saga/core/effects'
import { fetchUserBegining, fetchUserSuccess, payForSubscriptionSuccess } from '../action-creators/userActions'
import { request } from '../../helpers/request.helper'
import { loadingStart, setAllSubscriptionsProducts, setAppAlert } from '../action-creators/appActions'
import { statuses } from '../../constants/app'
import { IUserWithToken } from '../../interfaces/user.interface'
import { WithMessage } from '../../interfaces/quizes.interface'
import { PaymentMethodResult } from '@stripe/stripe-js'

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

export function* getAvailableSubscriptionsSaga() {
  try {
    yield put(loadingStart());
    const data: { subscriptions: any[] } & WithMessage = yield call(() => request('/profile/payment/sub', 'GET'));
    yield put(setAllSubscriptionsProducts(data.subscriptions));
    yield put(setAppAlert(data.message, statuses.SUCCESS));
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}

export function* getClientSecretAndSubscribeSaga({ payload: { stripe, method, email } }) {
  try {
    const result: PaymentMethodResult = yield call(() => stripe.createPaymentMethod(method));
    if (result.error && result.error.message) throw new Error(result.error.message);
    else {
      const res: {
        client_secret: string;
        status: string;
        id: string;
      } = yield call(() => request('/profile/payment/sub', 'POST', { payment_method: result.paymentMethod.id, email }));
      const {client_secret, status, id} = res;
      let payment = null;
      if (status === 'requires_action') {
        payment = yield call(() => stripe.confirmCardPayment(client_secret));
        if (payment.error) throw new Error('Subscription payment failed. Try later');
      }
      if (status === 'succeeded' || !payment.error) {
        const data: { confirmed: string; subscriptions: string[] } & WithMessage =  yield call(() => request('/profile/payment/sub/confirm', 'POST', { id }));
        if (data.confirmed) {
          yield put(setAppAlert('Subscription has been paid successfully', statuses.SUCCESS));
          yield put(payForSubscriptionSuccess(data.subscriptions));
        } else yield put(setAppAlert(data.message, statuses.SUCCESS));
      }
    }
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}