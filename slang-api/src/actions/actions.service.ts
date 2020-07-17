import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class ActionsService {
  constructor(private httpService: HttpService) {}

  wordsBaseURL = 'https://random-word-api.herokuapp.com';
  pronounceBaseURL = 'http://api.voicerss.org/';

  async getWords() {
    return this.httpService
      .get<string[]>(`${this.wordsBaseURL}/word`, {
        params: {
          number: 10,
        },
      })
      .pipe(map(res => res.data));
  }

  async getSpeech(word: string) {
    const normal = await this.httpService
      .get<string[]>(this.pronounceBaseURL, {
        params: {
          key: '49f0551a55144ef79dadaeccf28b3383',
          hl: 'en-us',
          src: word,
          c: 'OGG',
          b64: true,
        },
      })
      .pipe(map(res => res.data))
      .toPromise();

    // const slow = await this.httpService
    //   .get<string[]>(this.pronounceBaseURL, {
    //     params: {
    //       key: '49f0551a55144ef79dadaeccf28b3383',
    //       hl: 'en-us',
    //       src: word,
    //       c: 'OGG',
    //       b64: true,
    //       r: -5,
    //     },
    //   })
    //   .pipe(map(res => res.data))
    //   .toPromise();

    return { normal };
  }
}
