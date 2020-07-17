import { Module } from '@nestjs/common';

import { ActionsModule } from './actions/actions.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ActionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
