import {IUserResponse, IWithErrors, IWithMessage} from "./common.interface";

export interface IProfileChangeResponse extends IWithMessage, IWithErrors {
	user: IUserResponse
}

export interface IProfileChangeAvatarResponse extends IWithMessage, IWithErrors {
	avatarUrl: string;
}