import { IQuizActions, IQuizReducer, quizActionTypes } from '../interfaces-reducers/quizReducer.interface'

const initialAppState: IQuizReducer = {
  loading: false,
  selectedQuiz: null,
  selfQuizzes: [],
  selfQuizzesWithStats: {
    loading: false,
    quizzes: []
  },
  allSelectedQuizzes: []
};

export const quizReducer = (state = initialAppState, action : IQuizActions): IQuizReducer => {
  switch (action.type) {
    case quizActionTypes.FETCH_QUIZZES_START:
      return {...state, loading: true};
    case quizActionTypes.SET_SELECTED_QUIZ:
      return {...state, selectedQuiz: action.payload};
    case quizActionTypes.FETCH_SELF_QUIZZES_SUCCESS:
      return {...state, loading: false, selfQuizzes: action.payload};
    case quizActionTypes.FETCH_SELECTED_QUIZZES_SUCCESS:
      return {...state, loading: false, allSelectedQuizzes: action.payload};
    case quizActionTypes.DELETE_QUIZ_SUCCESS:
      return {...state, loading: false,
        selfQuizzes: state.selfQuizzes.filter(quiz => quiz.id !== action.payload),
        allSelectedQuizzes: state.allSelectedQuizzes.filter(quiz => quiz.id !== action.payload)
      };
    case quizActionTypes.GET_QUIZ_STATS: return {
      ...state,
      selfQuizzesWithStats: {
        ...state.selfQuizzesWithStats,
        loading: true
      }
    };
    case quizActionTypes.GET_QUIZ_STATS_SUCCESS:
      return {...state,
        selfQuizzesWithStats: {
          loading: false,
          quizzes: state.selfQuizzesWithStats.quizzes.find(q => q.id === action.payload.id)
            ? [...state.selfQuizzesWithStats.quizzes.slice(0, state.selfQuizzesWithStats.quizzes.findIndex(q => q.id === action.payload.id)),
              { id: action.payload.id, usersAnswers: action.payload.usersAnswers },
              ...state.selfQuizzesWithStats.quizzes.slice(state.selfQuizzesWithStats.quizzes.findIndex(q => q.id === action.payload.id))
            ]
            : [...state.selfQuizzesWithStats.quizzes, { id: action.payload.id, usersAnswers: action.payload.usersAnswers }]
        }
      };
    default: return state;
  }
};