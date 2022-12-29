import {AxiosService} from "./Axios.service";
import {IAxiosLoginPayload, IAxiosRegisterPayload} from "../../interfaces/http.interface";
import {ILoginResponse, IRegistrationResponse} from "../store-interfaces/authService.interface";

export class AuthService extends AxiosService {
	private route = '/auth';

	constructor() {
		super();
	}

	login(payload: IAxiosLoginPayload) {
		return async () => {
			try {
				const response = await AxiosService.api.post<ILoginResponse>(this.route + '/login', payload);
				return response;
			} catch ({ response }) {
				return response;
			}
		};
	}

	register(payload: IAxiosRegisterPayload) {
		return async () => {
			try {
				const response = await AxiosService.api.post<IRegistrationResponse>(this.route + '/register', payload);
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	reset(email: string) {
		return async () => {
			try {
				const response = await AxiosService.api.post<any>(this.route + '/reset', { email });
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	logout() {
		return async () => {
			try {
				const response = await AxiosService.api.post<any>(this.route + '/logout');
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	activate(activationLink: string) {
		return async () => {
			try {
				const response = await AxiosService.api.get<any>(`${this.route}/auth/activate/${activationLink}`);
				return response;
			} catch ({response}) {
				return response
			}
		};
	}

	refresh() {
		return async () => {
			try {
				const { get } = AxiosService.createNewAxiosInstance();
				const response = await get(this.route + '/refresh');
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}
}

export default new AuthService();