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

export interface ISubscriptionResponse {
	subscriptionData: ISubscriptionSuccess
}

export interface ISubscriptionSuccess {
	clientSecret: string;
	level: string;
	createdAt: number;
	endedAt: number;
	subId: string;
	isExpired: boolean;
	status: string;
}


export interface ISubscription {
	subId: string;
	userId: string;
	createdAt: Date;
	endAt: Date;
	isExpired: boolean;
	level: string;
	productId: string;
}

export interface ISubscriptionConfirmationData {
	sub: ISubscription;
	confirmed: boolean;
}