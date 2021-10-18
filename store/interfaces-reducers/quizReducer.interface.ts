import { IQuiz, IQuizWithQuizCreator, IResponseQuiz } from '../../interfaces/quizes.interface'

export interface IQuizReducer {
  loading?: boolean;
  selectedQuiz?: IQuizState;
  selfQuizzes?: IQuiz[];
  allSelectedQuizzes?: IQuizWithQuizCreator[];
}

export interface IQuizState {
  id: string | number;
  title?: string | number;
  question?: string | number;
  creator?: any;
  usersAnswers?: any[];
  quizAnswers?: any[];
}

export enum quizActionTypes {
  DEFAULT = 'DEFAULT',
  SET_SELECTED_QUIZ = 'SET_SELECTED_QUIZ',
  FETCH_SELF_QUIZZES = 'FETCH_SELF_QUIZZES',
  FETCH_SELECTED_QUIZZES = 'FETCH_SELECTED_QUIZZES',
  FETCH_SELF_QUIZZES_SUCCESS = 'FETCH_SELF_QUIZZES_SUCCESS',
  FETCH_SELECTED_QUIZZES_SUCCESS = 'FETCH_SELECTED_QUIZZES_SUCCESS',
  FETCH_QUIZZES_START = 'FETCH_QUIZZES_START',
  DELETE_QUIZ = 'DELETE_QUIZ',
  DELETE_QUIZ_SUCCESS = 'DELETE_QUIZ_SUCCESS',
}

export interface IQuizSetSelected {
  type: quizActionTypes.SET_SELECTED_QUIZ;
  payload: IQuizState;
}

export interface IQuizFetchSelfQuizzesSuccess {
  type: quizActionTypes.FETCH_SELF_QUIZZES_SUCCESS;
  payload: IQuiz[];
}

export interface IQuizFetchSelectedQuizzesSuccess {
  type: quizActionTypes.FETCH_SELECTED_QUIZZES_SUCCESS;
  payload: IQuizWithQuizCreator[];
}

export interface IQuizFetchSelfQuizzes {
  type: quizActionTypes.FETCH_SELF_QUIZZES;
}

export interface IQuizFetchSelectedQuizzes {
  type: quizActionTypes.FETCH_SELECTED_QUIZZES;
  payload: string;
}

export interface IQuizFetchQuizzesStart {
  type: quizActionTypes.FETCH_QUIZZES_START;
}

export interface IQuizDeleteQuiz {
  type: quizActionTypes.DELETE_QUIZ;
  payload: string;
}

export interface IQuizDeleteQuizSuccess {
  type: quizActionTypes.DELETE_QUIZ_SUCCESS;
  payload: string;
}

export type IQuizActions = IQuizSetSelected | IQuizFetchSelfQuizzesSuccess | IQuizFetchSelectedQuizzesSuccess | IQuizFetchQuizzesStart
  | IQuizFetchSelfQuizzes | IQuizFetchSelectedQuizzes | IQuizDeleteQuiz | IQuizDeleteQuizSuccess;