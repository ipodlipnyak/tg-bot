import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CommonModule } from '@my/common';
import { HttpModule } from '@nestjs/axios';
import { BotController } from './bot.controller';

@Module({
  controllers: [
    BotController
  ],
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    TelegramService,
  ],
})
export class BotModule {}
