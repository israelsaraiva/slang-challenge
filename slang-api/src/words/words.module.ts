import { HttpModule, Module } from '@nestjs/common';

import { WordsController } from './words.controller';
import { WordsService } from './words.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://random-word-api.herokuapp.com',
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [WordsService],
  controllers: [WordsController],
})
export class WordsModule {}
