import { IQuizActions, IQuizReducer, quizActionTypes } from '../store-interfaces/quizReducer.interface'
import {createSlice} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";
import {ExternalActions} from "@ActionCreators/externalActions";

const initialState: IQuizReducer = {
  loading: false,
  selectedQuiz: null,
  allSelectedQuizzes: [],
  selfQuizzesWithStats: {
    loading: false,
    quizzes: []
  },
  selfQuizzes: []
};

const QuizActions = ExternalActions.Quiz;

export const name = 'quiz';
export const { reducer, actions } = createSlice({
  name, initialState,
  reducers: {
    quizLoadingStart: state => {
      state.loading = true;
    },
    quizLoadingEnd: state => {
      state.loading = false;
    },
    setQuizzes: (state, action) => {
      state.allSelectedQuizzes = action.payload;
    },
    deleteQuiz: (state, action) => {
      state.selfQuizzes = state.selfQuizzes.filter(quiz => quiz.id !== action.payload);
      state.allSelectedQuizzes = state.allSelectedQuizzes.filter(quiz => quiz.id !== action.payload);
    },
    setSelfQuizzes: (state, action) => {
      state.selfQuizzes = action.payload;
    },
    setSelfQuizzesWithStats: (state, action) => {
      state.selfQuizzesWithStats.quizzes.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(QuizActions.setSelectedQuiz, (state, action) => {
      state.selectedQuiz = action.payload;
    })
  }
})