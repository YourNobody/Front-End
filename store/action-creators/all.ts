import * as UserActionCreators from '../action-creators/userActions';
import * as AppActionCreators from '../action-creators/appActions';
import * as QuizActionCreators from '../action-creators/quizActions';

export const ActionCreators = {
  ...UserActionCreators,
  ...AppActionCreators,
  ...QuizActionCreators
};