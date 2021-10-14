import { all } from '@redux-saga/core/effects'
import { userTypes } from './interfaces-reducers/userReducer.interface'
import { loginSaga, registerSaga, resetSaga } from './services/authService'
import * as Eff from 'redux-saga/effects'

const takeEvery: any = Eff.takeEvery;

export function* rootWatcher() {
  yield all([
    authWatcher()
  ])
};

function* authWatcher() {
  const { REGISTER_USER, RESET_USER, LOGIN_USER } = userTypes;
  yield takeEvery(REGISTER_USER, registerSaga);
  yield takeEvery(LOGIN_USER, loginSaga);
  yield takeEvery(RESET_USER, resetSaga);
}