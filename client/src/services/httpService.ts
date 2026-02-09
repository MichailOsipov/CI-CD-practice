import axios, {
  type AxiosResponse,
  type Axios,
  type AxiosRequestConfig,
} from 'axios';

type InterceptorOptions<V> = {
  onFulfilled?: (value: V) => V | Promise<V>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRejected?: (error: any) => any
};

type InterceptorId = number;

class HttpService {
  private readonly instance: Axios;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
  }

  public registerRequestInterceptor({
    onFulfilled,
    onRejected,
  }: InterceptorOptions<AxiosRequestConfig>): ReturnType<Axios['interceptors']['response']['use']> {
    return this.instance.interceptors.request.use(onFulfilled, onRejected);
  }

  public registerResponseInterceptor({
    onFulfilled,
    onRejected
  }: InterceptorOptions<AxiosResponse>): ReturnType<Axios['interceptors']['response']['use']> {
    return this.instance.interceptors.response.use(onFulfilled, onRejected);
  }

  public unregisterRequestInterceptor(interceportId: InterceptorId) {
    this.instance.interceptors.request.eject(interceportId);
  }

  public unregisterResponseInterceptor(interceportId: InterceptorId) {
    this.instance.interceptors.response.eject(interceportId);
  }

  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.get<T, R, D>(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.instance.post<T, R, D>(url, data, config);
  }
}

export const http = new HttpService({
  baseURL: window.location.origin,
  headers: {
    'X-Referrer': `${window.location.origin}${window.location.pathname}`,
  },
});
