import HttpService from '../http.service';

export const BaseService = <T>(url: string) => {
  const all = () => {
    return HttpService.get<T[]>(url);
  };

  const one = (id: number) => {
    return HttpService.get<T>(`${url}/${id}`);
  };

  const create = (data: T) => {
    return HttpService.post(url, data);
  };

  const update = (id: number, data: T) => {
    return HttpService.put(`${url}/${id}`, data);
  };

  const remove = (id: number) => {
    return HttpService.delete(`${url}/${id}`);
  };

  return { all, one, create, update, remove };
};
