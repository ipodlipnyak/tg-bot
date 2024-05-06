import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { CommonModule } from '@my/common';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    CommonModule
  ],
  providers: [
    TelegramService,
    ConsumerService,
  ],
})
export class AppModule {}
