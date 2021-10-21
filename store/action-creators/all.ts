import UserCreators from '../action-creators/userActions';
import AppCreators from '../action-creators/appActions';
import QuizCreators from '../action-creators/quizActions';

export const ActionCreators = {
  ...UserCreators,
  ...AppCreators,
  ...QuizCreators
};