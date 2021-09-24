import { quizActionTypes, IQuizSetSelected, IQuizState } from "../interfaces-reducers/quizReducer.interface";

export const setQuizSelected = (quiz: IQuizState): IQuizSetSelected => {
  return {type: quizActionTypes.SET_SELECTED_QUIZ, payload: quiz};
};