import {
  IQuiz,
  IQuizResponse,
  IQuizWithQuizCreator,
} from '../../interfaces/quizes.interface'

export interface IQuizReducer {
  loading?: boolean;
  selectedQuiz?: IQuizState;
  selfQuizzes?: IQuiz[];
  selfQuizzesWithStats?: {
    loading?: boolean,
    quizzes?: any[];
  };
  allSelectedQuizzes?: IQuizWithQuizCreator[];
  isSelfQuizzesIsLoaded?: boolean;
}

export interface IQuizState {
  type: string;
  id: string | number;
  title?: string | number;
  question?: string | number;
  creator?: any;
  usersAnswers?: any[];
  quizAnswers?: any[];
}

export interface IGetQuizSuccess {
  type: quizActionTypes.GET_QUIZ_SUCCESS
  payload: any;
}

export enum quizActionTypes {
  DEFAULT = 'DEFAULT',
  SET_SELECTED_QUIZ = 'SET_SELECTED_QUIZ',
  FETCH_SELF_QUIZZES = 'FETCH_SELF_QUIZZES',
  FETCH_SELECTED_QUIZZES = 'FETCH_SELECTED_QUIZZES',
  FETCH_SELF_QUIZZES_SUCCESS = 'FETCH_SELF_QUIZZES_SUCCESS',
  FETCH_SELECTED_QUIZZES_SUCCESS = 'FETCH_SELECTED_QUIZZES_SUCCESS',
  FETCH_QUIZZES_START = 'FETCH_QUIZZES_START',
  FETCH_QUIZZES_END = 'FETCH_QUIZZES_END',
  DELETE_QUIZ = 'DELETE_QUIZ',
  DELETE_QUIZ_SUCCESS = 'DELETE_QUIZ_SUCCESS',
  GET_QUIZ_STATS = 'GET_QUIZ_STATS',
  GET_QUIZ_STATS_SUCCESS = 'GET_QUIZ_STATS_SUCCESS',
  SAVA_QUIZ_ANSWER = 'SAVA_QUIZ_ANSWER',
  SAVA_QUIZ_ANSWER_SUCCESS = 'SAVA_QUIZ_ANSWER_SUCCESS',
  CREATE_QUIZ = 'CREATE_QUIZ',
  CREATE_QUIZ_SUCCESS = 'CREATE_QUIZ_SUCCESS',
  GET_QUIZ = 'GET_QUIZ',
  GET_QUIZ_SUCCESS = 'GET_QUIZ_SUCCESS'
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

export interface IQuizFetchQuizzesEND {
  type: quizActionTypes.FETCH_QUIZZES_END;
}

export interface IQuizDeleteQuiz {
  type: quizActionTypes.DELETE_QUIZ;
  payload: string;
}

export interface IQuizDeleteQuizSuccess {
  type: quizActionTypes.DELETE_QUIZ_SUCCESS;
  payload: string;
}

export interface IQuizGetQuizStats {
  type: quizActionTypes.GET_QUIZ_STATS;
  payload: string;
}

export interface IQuizGetQuizStatsSuccess {
  type: quizActionTypes.GET_QUIZ_STATS_SUCCESS;
  payload: Omit<IQuizResponse, 'quizes'> & { id: string };
}

export interface IQuizSaveAnswer {
  type: quizActionTypes.SAVA_QUIZ_ANSWER;
  payload: string;
  quizType: any;
}

export interface IQuizSaveAnswerSuccess {
  type: quizActionTypes.SAVA_QUIZ_ANSWER_SUCCESS;
}

export interface IQuizCreate {
  type: quizActionTypes.CREATE_QUIZ;
  payload: {
    title: string;
    type: string;
    question: string;
    quizAnswers: string[] | null;
  }
}

export interface IQuizCreateSuccess {
  type: quizActionTypes.CREATE_QUIZ_SUCCESS;
}

export type IQuizActions = IQuizSetSelected | IQuizFetchSelfQuizzesSuccess | IQuizFetchSelectedQuizzesSuccess | IQuizFetchQuizzesStart
  | IQuizFetchSelfQuizzes | IQuizFetchSelectedQuizzes | IQuizDeleteQuiz | IQuizDeleteQuizSuccess |
  IQuizGetQuizStats | IQuizGetQuizStatsSuccess | IQuizSaveAnswer | IQuizSaveAnswerSuccess |
  IQuizCreate | IQuizCreateSuccess | IQuizFetchQuizzesEND | IGetQuizSuccess;