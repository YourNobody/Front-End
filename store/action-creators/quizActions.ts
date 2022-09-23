import {
  quizActionTypes,
  IQuizSetSelected,
  IQuizState,
  IQuizFetchSelectedQuizzes,
  IQuizFetchSelfQuizzes,
  IQuizFetchSelfQuizzesSuccess,
  IQuizFetchSelectedQuizzesSuccess,
  IQuizDeleteQuiz,
  IQuizDeleteQuizSuccess,
  IQuizGetQuizStats,
  IQuizGetQuizStatsSuccess,
  IQuizSaveAnswer,
  IQuizSaveAnswerSuccess,
  IQuizCreateSuccess,
} from '../store-interfaces/quizReducer.interface'

export const setQuizSelected = (payload: IQuizState): IQuizSetSelected => {
  return {type: quizActionTypes.SET_SELECTED_QUIZ, payload};
};

export const quizFetchingStart = () => {
  return {type: quizActionTypes.FETCH_QUIZZES_START};
};

export const quizFetchingEnd = () => {
  return {type: quizActionTypes.FETCH_QUIZZES_END};
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

export const deleteQuiz = (payload): IQuizDeleteQuiz => {
  return {type: quizActionTypes.DELETE_QUIZ, payload};
};

export const deleteQuizSuccess = (payload): IQuizDeleteQuizSuccess => {
  return {type: quizActionTypes.DELETE_QUIZ_SUCCESS, payload};
};

export const getQuizStats = (payload): IQuizGetQuizStats => {
  return {type: quizActionTypes.GET_QUIZ_STATS, payload};
};

export const getQuizStatsSuccess = (payload): IQuizGetQuizStatsSuccess => {
  return {type: quizActionTypes.GET_QUIZ_STATS_SUCCESS, payload};
};

export const saveQuizAnswer = (type, payload): IQuizSaveAnswer => {
  return {type: quizActionTypes.SAVA_QUIZ_ANSWER, payload, quizType: type};
};

export const saveQuizAnswerSuccess = (payload): IQuizSaveAnswerSuccess => {
  return {type: quizActionTypes.SAVA_QUIZ_ANSWER_SUCCESS};
};

export const createQuiz = (type: string, payload: any, redirectFunc: () => void) => {
  return {type: quizActionTypes.CREATE_QUIZ, payload, quizType: type, redirectFunc};
};

export const createQuizSuccess = (): IQuizCreateSuccess => {
  return {type: quizActionTypes.CREATE_QUIZ_SUCCESS};
};

export const getQuiz = (path: string, id: string) => {
  return { type: quizActionTypes.GET_QUIZ, path, id };
}

export const getQuizSuccess = (quiz: any) => {
  return { type: quizActionTypes.GET_QUIZ_SUCCESS, payload: quiz };
}

export default {
  setQuizSelected,
  fetchSelectedQuizzes,
  fetchSelfQuizzes,
  deleteQuiz,
  getQuizStats,
  saveQuizAnswer,
  createQuiz,
  getQuiz,
};