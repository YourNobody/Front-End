import { AxiosService } from './Axios.service';

export class AppService extends AxiosService {
  private route = '/';
  private subRoute = '/subscriptions';

  constructor() {
    super();
  }

  getSubscriptionsProducts() {
    return async () => {
      try {
        const response = await AxiosService.api.get<any>(this.subRoute + '/products');
        return response;
      } catch ({response}) {
        return response;
      }
    };
  }
}

export default new AppService();