import { call, put } from '@redux-saga/core/effects';
import { fetchUserBegining, fetchUserSuccess } from '../action-creators/userActions'
import { request } from '../../helpers/request.helper';
import { setAppAlert } from '../action-creators/appActions';
import { statuses } from '../../constants/app';
import { IUser, IUserWithToken } from '../../interfaces/user.interface'
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