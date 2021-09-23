import { ANONYMOUS_NAME } from './../../Back-End/src/constants/app';
export enum QuestionTypes {
  SA = 'SA', TA = 'TA', RA ='RA', AB ='AB'
}

export type QuestionParamsTypes = {
  qType: QuestionTypes;
  title: string;
};

export interface IQuizData {
  title: string;
  src: string;
  description: string;
  type: QuestionTypes;
}

export interface MainQuestionsProps {
  title?: string;
  question?: string;
  usersAnswers?: any[];
  creator?: string;
  _id?: string; 
}

export interface IUserAnswer {
  quizId?: string;
  answer?: string;
}