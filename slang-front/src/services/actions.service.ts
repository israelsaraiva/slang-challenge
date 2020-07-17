import HttpService from './http.service';
import { SpeechModel } from 'models/speech.model';

const url = 'actions';

export const ActionsService = {
  getWords: () => HttpService.get<string[]>(url),
  getSpeech: (word: string) => HttpService.get<SpeechModel>(`${url}/${word}`),
};
