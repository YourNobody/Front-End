export enum QuestionTypes {
  SA = 'SA', TA = 'TA', RA ='RA', AB ='AB'
}

export interface WithMessage {
  message?: string;
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
  isForVip: boolean;
}

export interface MainQuestionsProps {
  title?: string;
  question?: string;
  usersAnswers?: IUserAnswer[];
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