import { IQuizReducer, IQuizActions, quizActionTypes } from "../interfaces-reducers/quizReducer.interface";

const initialAppState: IQuizReducer = {
  selectedQuiz: null
};

export const quizReducer = (state = initialAppState, action : IQuizActions): IQuizReducer => {
  switch (action.type) {
    case quizActionTypes.SET_SELECTED_QUIZ:
      return {...state, selectedQuiz: action.payload};
    default: return state;
  }
};