import { HttpModule, Module } from '@nestjs/common';

import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ActionsService],
  controllers: [ActionsController],
})
export class ActionsModule {}
