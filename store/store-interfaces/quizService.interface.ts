import {IQuizRequiredResponse, IStatResponse} from "./common.interface";

export interface ICreateQuizResponse extends IQuizRequiredResponse{
}

export interface IGetQuizzesResponse<T> {
	quizzes: T[];
}

export interface IGetProfileQuizzesResponse {
	quizzes: IQuizRequiredResponse[];
}

interface IGetSAQuizResponse {
	variants: any[];
	answers: any[];
}

interface IGetTAQuizResponse {
	answer: any[];
}

interface IGetRAQuizResponse {
	answer: any[];
	images: any[];
}

interface IGetABQuizResponse {
	variants: any[];
	images: any[];
	answers: any[];
}

export interface IGetQuizResponse {
	quiz: IQuizRequiredResponse;
}

export interface IGetQuizStatisticsResponse {
	statistics: Record<string, IStatResponse>;
}

export interface IDeleteQuizResponse {
	isDeleted: boolean;
	id: string;
}

export interface ISaveUserAnswerResponse extends IQuizRequiredResponse {

}