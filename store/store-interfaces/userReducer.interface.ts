import {ILoginResponse} from "./authService.interface";
import {IUserResponse} from "./common.interface";

export interface IUserReducer {
  nickname: string;
  email: string;
  id: string;
  avatar: string;
}

export interface IUserState {
  user: IUserResponse;
  loading: boolean;
  subscriptions: any[] | null;
  accessToken: string;
  isAuthChecked: boolean;
  clientSecret?: string;
}

interface WithRedirectFunction {
  redirectFunc?: () => any;
}
//
// export interface IUserPayForSubscription {
//   type: userTypes.PAY_FOR_SUBSCRIPTION;
//   payload: {
//     stripe: any;
//     clientSecret: string;
//     method: any;
//   }
// }
//
// export interface IUserGetClientSecret {
//   type: userTypes.GET_CLIENT_SECRET;
//   payload: {
//     stripe: any;
//     method: any;
//     email: string;
//     priceId: string;
//   };
// }