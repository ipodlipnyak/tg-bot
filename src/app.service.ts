import { Injectable, Logger } from '@nestjs/common';
import { Message } from './models';
import { ProducerService } from './producer.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private producerService: ProducerService,
  ) {}

  /**
   *
   * @param text
   * @returns
   */
  async saveMessage(text: string): Promise<number | null> {
    let result: number | null = null;

    try {
      await this.producerService.addToQueue(text);
      const message = new Message();
      message.content = text;
      await message.save();
      await message.reload();
      result = message.id;
    } catch (e) {
      this.logger.error(e);
    }

    return result;
  }
}
