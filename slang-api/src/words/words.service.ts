import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class WordsService {
  constructor(private httpService: HttpService) {}

  async getWords() {
    return this.httpService
      .get<string[]>('/word', {
        params: {
          number: 10,
        },
      })
      .pipe(map(res => res.data));
  }
}
