import {IUserResponse, IWithErrors, IWithMessage} from "./common.interface";

export interface IRegistrationResponse extends IWithMessage, IWithErrors {
	isRegistered: boolean;
}

export interface ILoginResponse extends IWithMessage, IWithErrors {
	user: IUserResponse;
	refreshToken: string;
	accessToken: string;
}

export interface IActivateResponse extends IWithMessage, IWithErrors {
	isActivated: boolean;
	redirectTime: number;
}

export interface IRefreshResponse extends ILoginResponse {}

export interface ILogoutResponse extends IWithMessage, IWithErrors {
	token: any;
}

export interface IRegisterRequest {
	email: string;
	nickname: string;
	password: string;
	confirm: string;
}