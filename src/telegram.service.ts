import { Injectable, Logger } from '@nestjs/common';
import { Message } from './models';
import { ProducerService } from './producer.service';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { TelegramMessageDto } from './dto/telegram.dto';


@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private bot = null;

  constructor(
    private producerService: ProducerService,
    private configService: ConfigService,
  ) {
    this.bot = new TelegramBot(
      configService.get('telegram.apikey')
    );
  }

  /**
   * Send message to chat
   *
   * @see https://github.com/yagop/node-telegram-bot-api
   * @param text
   */
  async reply(text: string, chatId: string) {
    try {
      await this.bot.sendMessage(
        chatId,
        text
      );
    } catch(e) {
      this.logger.debug(e);
    }
  }

  /**
   *
   * @param text
   * @returns
   */
  async saveMessage(message: TelegramMessageDto): Promise<number | null> {
    let result: number | null = null;

    try {
      await this.producerService.addToQueue(message);
      const messageModel = new Message();
      messageModel.content = message.text;
      messageModel.chatid = message.chat.id;
      await messageModel.save();
      await messageModel.reload();
      result = messageModel.id;
    } catch (e) {
      this.logger.error(e);
    }

    return result;
  }
}
