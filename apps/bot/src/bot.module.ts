import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CommonModule } from '@my/common';
// import { ConsumerService } from './consumer.service';
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
    // ConsumerService,
  ],
})
export class BotModule {}
