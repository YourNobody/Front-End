import { call, put } from '@redux-saga/core/effects';
import {
  fetchUserBegining,
  fetchUserSuccess,
} from '../action-creators/userActions';
import { request } from '../../helpers/request.helper';
import { setAppAlert, setStripeToken } from '../action-creators/appActions';
import { statuses } from '../../constants/app';
import { IUserWithToken } from '../../interfaces/user.interface';
import { WithMessage } from '../../interfaces/quizes.interface';
import { PaymentMethodResult } from '@stripe/stripe-js';

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

export function* getClientSecretAndSubscribeSaga({ payload: { stripe, method, email } }) {
  try {
    const result: PaymentMethodResult = yield call(() => stripe.createPaymentMethod(method));
    if (result.error && result.error.message) throw new Error(result.error.message);
    else {
      const res: {
        client_secret: string;
        status: string;
      } = yield call(() => request('/profile/payment/sub', 'POST', { payment_method: result.paymentMethod.id, email }));
      const {client_secret, status} = res;
      if (status === 'requires_action') {
        const payment = yield call(() => stripe.confirmCardPayment(client_secret));
        if (payment.error) throw new Error('Subscription payment failed. Try later');
        yield put(setAppAlert('Subscription has been paid successfully', statuses.SUCCESS));
      } else if (status === 'succeeded') {
        yield put(setAppAlert('Subscription has been paid successfully', statuses.SUCCESS));
      }
    }
  } catch (e: any) {
    yield put(setAppAlert(e.message, statuses.ERROR));
  }
}