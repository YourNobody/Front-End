import axios, {AxiosResponse} from "axios";
import AuthService from "./Auth.service";
import {IRefreshResponse} from "../store-interfaces/authService.interface";
import {LOCALSTORAGE_ACCESS_TOKEN_NAME} from "@Constants";

export class AxiosService {
	private static axiosConfig = {
		withCredentials: true
	};

	private static isInterceptorsSettled = false;

	constructor() {
		if (!AxiosService.isInterceptorsSettled) {
			AxiosService.setInterceptorRequest();
			AxiosService.setInterceptorResponse();
			AxiosService.isInterceptorsSettled = true;
		}
	}

	protected static api = axios.create(AxiosService.axiosConfig);

	protected static createNewAxiosInstance() {
		return axios.create(AxiosService.axiosConfig);
	}

	private static setInterceptorRequest() {
		AxiosService.api.interceptors.request.use(config => {
			const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN_NAME);
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
				return config;
			}
			return config;
		});
	}

	private static setInterceptorResponse() {
		AxiosService.api.interceptors.response.use(config => {
			return config;
		}, async (error) => {
			const originalConfig = error.config;
			if (error.response.status === 401 && originalConfig && !originalConfig._isRetry) {
				try {
					originalConfig._isRetry = true;
					const { data }: AxiosResponse<IRefreshResponse> = await AuthService.refresh()();

					localStorage.setItem(LOCALSTORAGE_ACCESS_TOKEN_NAME, data.accessToken);

					return AxiosService.api.request(originalConfig);
				} catch (e: any) {
					localStorage.removeItem(LOCALSTORAGE_ACCESS_TOKEN_NAME);
					console.log('User is unauthorized');
				}
			}
			throw error;
		});
	}
}