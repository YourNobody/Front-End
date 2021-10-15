import {
  quizActionTypes,
  IQuizSetSelected,
  IQuizState,
  IQuizFetchQuizzesStart,
  IQuizFetchSelectedQuizzes,
  IQuizFetchSelfQuizzes,
  IQuizFetchSelfQuizzesSuccess,
  IQuizFetchSelectedQuizzesSuccess,
} from '../interfaces-reducers/quizReducer.interface'

export const setQuizSelected = (payload: IQuizState): IQuizSetSelected => {
  return {type: quizActionTypes.SET_SELECTED_QUIZ, payload};
};

export const fetchQuizStart = (): IQuizFetchQuizzesStart => {
  return {type: quizActionTypes.FETCH_QUIZZES_START};
};

export const fetchSelectedQuizzesSuccess = (payload): IQuizFetchSelectedQuizzesSuccess => {
  return {type: quizActionTypes.FETCH_SELECTED_QUIZZES_SUCCESS, payload};
};

export const fetchSelfQuizzesSuccess = (payload): IQuizFetchSelfQuizzesSuccess => {
  return {type: quizActionTypes.FETCH_SELF_QUIZZES_SUCCESS, payload};
};

export const fetchSelectedQuizzes = (payload): IQuizFetchSelectedQuizzes => {
  return {type: quizActionTypes.FETCH_SELECTED_QUIZZES, payload};
};

export const fetchSelfQuizzes = (): IQuizFetchSelfQuizzes => {
  return {type: quizActionTypes.FETCH_SELF_QUIZZES};
};