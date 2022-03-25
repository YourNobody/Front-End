import {call, put} from '@redux-saga/core/effects';
import {allStoreInnerActions as InnerActions} from '@Slices';
import {allExternalActions as ExternalActions} from "@ActionCreators/externalActions";
import * as T from '@Interfaces/sagaActions.interface';
import {statuses} from '../../constants/app';
import QuizService from '../services/Quiz.service';
import ProfileService from "../services/Profile.service";
import {AxiosResponse} from "axios";
import {Subject} from "rxjs";

let loadingMessage = 'Wait for the end of the process, please';

export function* getSelfQuizzesSaga() {
	yield put(InnerActions.quizLoadingStart());

	const {data, status}: AxiosResponse<any> = yield call(ProfileService.getProfileQuizzes());

	if (status < 400) {
		yield put(InnerActions.setSelfQuizzes(data.quizzes));
	} else {
		// yield put(fetchSelfQuizzesSuccess([]));
	}

	yield put(InnerActions.quizLoadingEnd());
}

export function* getSelfQuizWithStats({ orderQuizNumber }: ReturnType<T.TGetSelfQuizWithStats>) {
	const {data, status}: AxiosResponse<any> = yield call(QuizService.getQuizStatistics(orderQuizNumber));

	if (status < 400) {
		yield put(InnerActions.setSelfQuizzesWithStats({ quiz: data.quiz, stats: data.stats }));
	} else {
		yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
	}

	yield put(InnerActions.quizLoadingEnd());
}

export function* getSelectedQuizzesSaga({ quizzesType }: ReturnType<T.TGetQuizzes>) {
	yield put(InnerActions.quizLoadingStart());

	const {data, status}: AxiosResponse<any> = yield call(QuizService.getQuizzes(quizzesType));

	if (status < 400) {
		yield put(InnerActions.setQuizzes(data.quizzes));
	} else {
	}

	yield put(InnerActions.quizLoadingEnd());
}

export function* getQuizSaga({ quizType, quizOrderNumber, title }: ReturnType<T.TGetQuiz>) {
	yield put(InnerActions.quizLoadingStart());

	const {data, status}: AxiosResponse<any> = yield call(QuizService.getQuiz(quizType, quizOrderNumber, title));

	if (status < 400) {
		yield put(ExternalActions.setSelectedQuiz(data.quiz));
	} else {
	}

	yield put(InnerActions.quizLoadingEnd());
}

export function* deleteQuizSaga({ quizId }: ReturnType<T.TDeleteQuiz>) {
	yield put(InnerActions.quizLoadingStart());

	const {data, status}: AxiosResponse<any> = yield call(QuizService.deleteQuiz(quizId));

	if (status < 400) {
		yield put(InnerActions.deleteQuiz(data.id));
		yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));
	} else {
		yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
	}

	yield put(InnerActions.quizLoadingEnd());
}

export function* saveQuizAnswerSaga({ quizId, answerData, callback }: ReturnType<T.TSaveUserAnswer>) {
	yield put(InnerActions.quizLoadingStart());

	const {data, status}: AxiosResponse<any> = yield call(QuizService.saveUserAnswer(quizId, answerData));

	if (status < 400) {
		yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));
	} else {
		yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));
	}

	yield put(InnerActions.quizLoadingEnd());
}

export function* createQuizSaga({ quizData, callback }: ReturnType<T.TCreateQuiz>) {
	const stream$ = new Subject<{ readyToDelete: boolean }>();

	yield put(InnerActions.quizLoadingStart());
	yield put(ExternalActions.setAppAlert(loadingMessage, statuses.WARNING, {
		isAutoDeleted: false,
		toDeleteStream: stream$,
		toDeleteAllBefore: true
	}));

	const {data, status}: AxiosResponse<any> = yield call(QuizService.createQuiz(quizData.type, quizData));

	if (status < 400) {
		yield put(ExternalActions.setAppAlert(data.message, statuses.SUCCESS));

		if (callback) yield call(callback);
	} else {
		yield put(ExternalActions.setAppAlert(data.message, statuses.ERROR));
	}

	stream$.next({readyToDelete: true});
	stream$.complete();
	yield put(InnerActions.quizLoadingEnd());
}