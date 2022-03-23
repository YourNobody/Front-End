import { call, put } from '@redux-saga/core/effects';
import { allStoreInnerActions as InnerActions } from '@Slices';
import { allExternalActions as ExternalActions } from "@ActionCreators/externalActions";
import { AxiosResponse } from 'axios';
import AppService from '../services/App.service';
import { statuses } from '@Constants';

export function* getAllAvailableSubscriptionsProducts() {
  yield put(InnerActions.appLoadingStart());
  const { data, status }: AxiosResponse<any> = yield call(AppService.getSubscriptionsProducts());

  if (status < 400) {
    yield put(InnerActions.setAllAvailableSubscriptionProducts(data.products));
  } else {
    yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
  }

  yield put(InnerActions.appLoadingEnd());
}