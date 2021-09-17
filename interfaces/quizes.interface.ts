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
}