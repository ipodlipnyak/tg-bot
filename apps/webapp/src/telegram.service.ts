import { Injectable, Logger } from '@nestjs/common';
import { Message } from './models';
import { ProducerService } from './producer.service';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { TelegramMessageDto } from './dto/telegram.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';


@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private bot = null;

  constructor(
    private producerService: ProducerService,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.bot = new TelegramBot(
      configService.get('telegram.apikey')
    );
  }

  /**
   * Send message to chat
   *
   * @param text
   */
  async reply(chatId: string, text: string) {
    const apikey = this.configService.get('telegram.apikey');
    const url = `https://api.telegram.org/bot${ apikey }/sendMessage`;

    const { data } = await firstValueFrom(
      this.httpService.post(url, {
        chat_id: chatId,
        text,
      }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
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
