import { Controller, Get, Param } from '@nestjs/common';

import { ActionsService } from './actions.service';

@Controller('actions')
export class ActionsController {
  constructor(private actionsService: ActionsService) {}

  @Get()
  getWords() {
    return this.actionsService.getWords();
  }

  @Get(':word')
  getSpeech(@Param('word') word: string) {
    return this.actionsService.getSpeech(word);
  }
}
