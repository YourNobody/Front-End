import * as UserActionCreators from '../action-creators/userActions';
import * as AppActionCreators from '../action-creators/appActions';

export const ActionCreators = {
  ...UserActionCreators,
  ...AppActionCreators
};