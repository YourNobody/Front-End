import { IQuizActions, IQuizReducer, quizActionTypes } from '../interfaces-reducers/quizReducer.interface'

const initialAppState: IQuizReducer = {
  loading: false,
  selectedQuiz: null,
  selfQuizzes: [],
  allSelectedQuizzes: []
};

export const quizReducer = (state = initialAppState, action : IQuizActions): IQuizReducer => {
  switch (action.type) {
    case quizActionTypes.SET_SELECTED_QUIZ:
      return {...state, selectedQuiz: action.payload};
    case quizActionTypes.FETCH_SELF_QUIZZES_SUCCESS:
      return {...state, loading: false, selfQuizzes: action.payload};
    case quizActionTypes.FETCH_SELECTED_QUIZZES_SUCCESS:
      return {...state, loading: false, allSelectedQuizzes: action.payload};
    case quizActionTypes.FETCH_QUIZZES_START:
      return {...state, loading: true};
    default: return state;
  }
};