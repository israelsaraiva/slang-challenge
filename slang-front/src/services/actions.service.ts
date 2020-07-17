import HttpService from './http.service';

const url = 'actions';

export const ActionsService = {
  getWords: () => HttpService.get<string[]>(url),
  getSpeech: (word: string) => HttpService.get<any>(`${url}/${word}`),
};
