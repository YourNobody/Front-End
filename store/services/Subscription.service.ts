import { AxiosService } from './Axios.service';
import {IAppBeforeConfirmConfig, IAppStripePaymentMethod} from '@Interfaces/actions.interface';

export class SubscriptionService extends AxiosService {
  private subRoute = '/subscriptions';

  constructor() {
    super();
  }

  getSubscriptionsProducts = () => {
    return async () => {
      try {
        const response = await AxiosService.api.get<any>(this.subRoute + '/products');
        return response;
      } catch ({response}) {
        return response;
      }
    };
  }

  beforeConfirmPayment = (method: IAppBeforeConfirmConfig) => {
    return async () => {
      try {
        const response = await AxiosService.api.post<any>(this.subRoute + '/', { ...method });
        return response;
      } catch ({response}) {
        return response;
      }
    };
	}

  confirmPayment(id: string) {
    return async () => {
      try {
        const response = await AxiosService.api.post<any>(this.subRoute + '/confirm', { id });
        return response;
      } catch ({response}) {
        return response;
      }
    };
  }
}

export default new SubscriptionService();