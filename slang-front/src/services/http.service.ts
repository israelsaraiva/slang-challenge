import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class HttpService {
  public static httpService: AxiosInstance;
  public static baseURL = process.env.REACT_APP_APIURL;

  static instance() {
    if (HttpService.httpService) {
      return HttpService.httpService;
    }

    const config: AxiosRequestConfig = {
      baseURL: HttpService.baseURL,
      timeout: 30000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    HttpService.httpService = Axios.create(config);

    return HttpService.httpService;
  }

  static get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    const httpService = HttpService.instance();
    const request = httpService.get(url, { params });
    return request;
  }

  static put(url: string, data: any): Promise<AxiosResponse<any>> {
    const httpService = HttpService.instance();
    const request = httpService.put(url, data);
    return request;
  }

  static post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
    const httpService = HttpService.instance();
    const request = httpService.post(url, data);
    return request;
  }

  static delete(url: string): Promise<AxiosResponse<any>> {
    const httpService = HttpService.instance();
    const request = httpService.delete(url);
    return request;
  }
}
