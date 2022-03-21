export interface IWithErrors {
	errors?: any[];
}

export interface IWithMessage {
	message: string;
}

export interface IUserResponse {
	email: string;
	id: string;
	nickname: string;
	premium: boolean;
	isActivated: boolean;
	avatar: string;
	quizzes: any[];
	subscriptions: any[];
}

export interface IQuizRequiredResponse {
	title: string;
	question: string;
	premium: boolean;
	userId: string;
	createdAt: Date;
}

export interface IStatResponse {
	amount: number;
}

