import {AxiosService} from "./Axios.service";

export class QuizService extends AxiosService {
	private route = '/quizzes';

	saveUserAnswer(quizId: string, answerData: any) {
		return async () => {
			try {
				const response = await AxiosService.api.post(
					`${this.route}/${answerData.quizType}/${answerData.orderNumber}/save`,
					answerData
				);
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	createQuiz(type: string, payload) {
		return async () => {
			try {
				const response = await AxiosService.api.post(`${this.route}/${type}/create`, payload);
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	deleteQuiz(id: string) {
		return async () => {
			try {
				const response = await AxiosService.api.post(`${this.route}/remove`, { id });
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	getQuizzes(type: string) {
		return async () => {
			try {
				const response = await AxiosService.api.get(`${this.route}/${type}`);
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	getQuiz(type, orderQuizNumber, title) {
		return async () => {
			try {
				const response = await AxiosService.api.get(`${this.route}/${type}/${orderQuizNumber}/${title}`);
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}

	getQuizStatistics(orderQuizNumber: number) {
		return async () => {
			try {
				const response = await AxiosService.api.get(`${this.route}/stats/${orderQuizNumber}`);
				return response;
			} catch ({response}) {
				return response;
			}
		};
	}
}

export default new QuizService();