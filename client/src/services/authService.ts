import { fetchLoginUser } from '../api/fetchLoginUser';
import { fetchLogoutUser } from '../api/fetchLogoutUser';

import { getAuthDataStorage, setAuthDataStorage } from './authStorage';
import { http } from './httpService';

type InterceptorId = number;

type Interceptors = {
  request: Set<InterceptorId>;
  response: Set<InterceptorId>;
};

class AuthService {
  private readonly interceptors: Interceptors = {
    request: new Set(), // used to pass auth token into headers - authorization
    response: new Set(), // used to refresh access_token if it's outdated
  };

  // eslint-disable-next-line class-methods-use-this
  public async init(onAuthError: () => void) {
    const token = getAuthDataStorage();

    if (!token) {
      throw new Error('No authorization data');
    }

    await this.setupInterceptors(onAuthError);
  }

  public async login(login: string, onAuthError: () => void) {
    const response = await fetchLoginUser(login);

    const { token } = response.data;

    setAuthDataStorage(token);

    await this.setupInterceptors(onAuthError);
  }

  private async setupInterceptors(onAuthError: () => void) {
    const requestInterceptorId = await http.registerRequestInterceptor({
      onFulfilled: (config) => {
        const token = getAuthDataStorage();

        if (`${config.baseURL}${config.url}`?.includes('/private/') && config.headers) {

          if (!token) {
            onAuthError();
          }
          // eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
          // config.headers.set('Authorization', `Bearer ${token}`);
        }
        
        // TODO add try catch token error handling if token in invalid or missing
        return config;
      },
    });

    const responseInterceptorId = await http.registerResponseInterceptor({
      onRejected: (error) => {
        if (error?.response?.status === 401) {
          onAuthError();
        }

        return Promise.reject(error);
      },
    });

    this.interceptors.request.add(requestInterceptorId);
    this.interceptors.response.add(responseInterceptorId);
  }

  public async logout() {
      await fetchLogoutUser();

      setAuthDataStorage(null);

      this.clearInterceptors();
  }

  private clearInterceptors() {
    this.interceptors.request.forEach((interceptor) => {
      http.unregisterRequestInterceptor(interceptor);
    });

    this.interceptors.response.forEach((interceptor) => {
      http.unregisterResponseInterceptor(interceptor);
    });

    this.interceptors.request.clear();
    this.interceptors.response.clear();
  }
}

export const authservice = new AuthService();
