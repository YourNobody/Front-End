export interface IQuizReducer {
  selectedQuiz?: IQuizState;
}

export interface IQuizState {
  id: string | number;
  title?: string | number;
  question?: string | number;
  creator?: any;
  usersAnswers?: any[];
  quizAnswerss?: any[];
}

export enum quizActionTypes {
  DEFAULT = 'DEFAULT',
  SET_SELECTED_QUIZ = 'SET_SELECTED_QUIZ',
}

export interface IQuizSetSelected {
  type: quizActionTypes.SET_SELECTED_QUIZ;
  payload: IQuizState;
}

export type IQuizActions = IQuizSetSelected;