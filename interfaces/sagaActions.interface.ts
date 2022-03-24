import {ILoginData, IRegisterData, TUserChangeData, TUserChangeOption} from "@Interfaces/user.interface";

type TCallback = (...params: any[]) => void;

export type TChangeUserInfo = <T extends TUserChangeData>(changeOption: TUserChangeOption, formData: T) => { changeOption: TUserChangeOption, formData: T };
export type TChangeUserAvatar = (avatarBase64: string) => { avatarBase64: string };
export type TActivateUserAccount = (activationLink: string) => { activationLink: string };
export type TRegisterUser = (registerData: IRegisterData, callback?: TCallback) => { registerData: IRegisterData, callback: TCallback };
export type TLoginUser = (loginData: ILoginData, callback?: TCallback) => { loginData: ILoginData, callback: TCallback };
export type TLogoutUser = (callback?: TCallback) => { callback?: TCallback };
export type TCheckUserAuth = (callback?: TCallback) => { callback?: TCallback };
export type TResetUserPassword = (email: string) => { email: string };
export type TGetQuiz = (quizType: string, quizOrderNumber: string, title: string) => { quizType: string, quizOrderNumber: string, title: string };
export type TGetQuizzes = (quizzesType: string) => { quizzesType: string };
export type TGetSelfQuizWithStats = (orderQuizNumber: number) => { orderQuizNumber: number };
export type TDeleteQuiz = (quizId: string) => { quizId: string };
export type TSaveUserAnswer = (quizId: string, answerData: any, callback?: TCallback) => { quizId: string, answerData: any, callback?: TCallback };
export type TCreateQuiz = (quizData: any, callback?: TCallback) => { quizData: any, callback?: TCallback };
export type TCancelSubscription = (subId: string, callback?: TCallback) => { subId: string, callback?: TCallback };

export type TGetSelfQuizzes = () => void;
export type TGetAllAvailableSubscriptions = () => void;
export type TGetSelfSybscriptions = () => void;