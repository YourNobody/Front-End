import {generateTypes} from "@Helpers";

export const ExternalActionsTypes = {
	App: generateTypes('app/',
		'SET_APP_ALERT',
		'CLEAR_APP_ALERT',
		'OPEN_MODEL',
		'CLOSE_MODAL',
		'CLEAR_ALL_ALERTS'
	),
	Quiz: generateTypes('quiz/',
		'SET_SELECTED_QUIZ'
	)
};