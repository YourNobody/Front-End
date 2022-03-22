import {AxiosService} from "./Axios.service";
import {IUserResponse} from "../store-interfaces/common.interface";
import {IQuizResponse} from "../../interfaces/quizes.interface";
import {TUserChangeData, TUserChangeOption} from "@Interfaces/user.interface";

export class ProfileService extends AxiosService {
	private route = '/profile';

	constructor() {
		super();
	}

	private async changeEmail(data) {
		try {
			const response = await AxiosService.api.post<IUserResponse>(this.route + '/change/email', data);
			return response;
		} catch ({response}) {
			return response;
		}
	}

	private async changePassword(data) {
		try {
			const response = await AxiosService.api.post<IUserResponse>(this.route + '/change/password', data);
			return response;
		} catch ({response}) {
			return response;
		}
	}

	private async changeNickname(data) {
		try {
			const response = await AxiosService.api.post<IUserResponse>(this.route + '/change/nickname', data);
			return response;
		} catch ({response}) {
			return response;
		}
	}

	changeInfo(changeOption: TUserChangeOption, data: TUserChangeData) {
		switch (changeOption) {
			case 'email': return () => this.changeEmail(data);
			case 'nickname': return () => this.changeNickname(data);
			case 'password': return () => this.changePassword(data);
		}
	}

	changeUserAvatar(imageBase64) {
		return async () => {
			try {
				const response = await AxiosService.api.post<any>(this.route + '/change/avatar', { imageBase64 });
				return response;
			} catch ({response}) {
				return response;
			}
		}
	}

	getAllRemoteSubscriptions(subscriptionId: string) {
		return async () => {
			try {
				const response = await AxiosService.api.get<any>(this.route + '/subscriptions');
			} catch ({response}) {
				return response;
			}
		};
	}

	getProfileQuizzes() {
		return async () => {
			try {
				const response = await AxiosService.api.get<IQuizResponse[]>(this.route + '/quizzes');
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	getAccountInfo() {
		return async () => {
			try {
				const response = await AxiosService.api.get<IUserResponse>(this.route + '/account');
			} catch ({response}) {
				return response;
			}
		};
	}
}

export default new ProfileService();