import {createAction} from "@reduxjs/toolkit";
import {v4} from "uuid";
import {ExternalActionsTypes} from "./externalActionsTypes";
import {statuses} from "@Constants";
import {IAppOpenModalConfig, IAppAlertOptions} from "@Interfaces/actions.interface";

const { App, Quiz } = ExternalActionsTypes;

export const ExternalActions = {
	App: {
		setAppAlert: createAction(App.SET_APP_ALERT, (message: string, status: statuses, options: IAppAlertOptions = {
			isAutoDeleted: true,
			toDeleteStream: null
		}) => ({ payload: {message, status, id: v4(), options} })),
		clearAppAlert: createAction(App.CLEAR_APP_ALERT, (id: string) => ({payload: id})),
		openModal: createAction(App.OPEN_MODEL, (config: IAppOpenModalConfig) => ({payload: config})),
		clearAllAlerts: createAction(App.CLEAR_ALL_ALERTS),
		closeModal: createAction(App.CLOSE_MODAL)
	},
	Quiz: {
		setSelectedQuiz: createAction(Quiz.SET_SELECTED_QUIZ, (quizData: any) => ({payload: quizData}))
	}
};

export const allExternalActions = {
	...ExternalActions.App,
	...ExternalActions.Quiz
};