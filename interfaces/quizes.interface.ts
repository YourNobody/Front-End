export const QuizzesTypes = {
  sa: 'sa', ta: 'ta', ra: 'ra', ab: 'ab'
};

export interface WithMessage {
  message: string;
}

export type QuestionParamsTypes = {
  qType: string;
  title: string;
};

export interface IQuizData {
  title: string;
  description: string;
  type: string;
  withSubscription: boolean;
}

export interface MainQuestionsProps {
  title: string;
  question: string;
  answers: IUserAnswer[];
  premium: boolean;
  creator?: string;
  id?: string;
}

export interface IUserAnswer {
  answer: string | number;
  userId?: string; 
  isAnonimous?: boolean;
  id: string;
  createdAt?: Date;
  updated?: Date;
}

export interface IQuizAnswer {
  answer: string;
  id: string;
}

export interface IQuiz {
  question: string;
  type: QuizesTypes;
  title: string;
  quizAnswers: IQuizAnswer[];
  usersAnswers: IUserAnswer[];
  userId: string;
  orderNumber: number;
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IResponseQuiz extends WithMessage {
  quizzes: IQuiz[];
}

export interface IQuizStatistic {
  amount: number;
  answer: string;
  users: Array<{
    nickname: string | null;
    email: string | null;
    isAnonymous: boolean;
  }>  
}

export interface IQuizResponse extends WithMessage {
  usersAnswers?: IQuizStatistic[];
  quizes?: IQuizWithQuizCreator[];
}

export interface WithQuizCreator {
  creator: {
    nickname: string | null;
    email: string | null;
  }
}

export interface IQuizWithQuizCreator extends Omit<IQuiz, 'userId'>, WithQuizCreator {}

export enum QuizesTypes {
  SA = 'SA', TA = 'TA', RA ='RA', AB ='AB'
}