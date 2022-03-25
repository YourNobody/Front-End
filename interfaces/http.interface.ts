export interface IAxiosLogin {
	accessToken: string;
	refreshToken: string;
	user: {
		email: string;
		nickname: string;
		id: string;
		quizzes: string;
		subscriptions: string;
	};
}

export interface IAxiosLoginPayload {
	email: string;
	password: string;
}

export interface IAxiosRegister {
}

export interface IAxiosRegisterPayload {
	nickname: string;
	email: string;
	password: string;
	confirm: string;
}

export interface IClientTokenDataFromStripe {
	client_secret: string;
	status: string;
	id: string;
}