import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ProducerService.name);

  constructor(
    private configService: ConfigService,
  ) {
    const connection = amqp.connect([this.configService.get('rabbitmq.url')]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue(
          this.configService.get('rabbitmq.queue'),
          { durable: true }
        );
      },
    });
  }

  async addToQueue(text: any) {
    try {
      const payload = JSON.stringify(text);
      await this.channelWrapper.sendToQueue(
        this.configService.get('rabbitmq.queue'),
        Buffer.from(payload),
      );

      this.logger.debug(`Sended message: ${ text }`);

    } catch (error) {
      throw new HttpException(
        'Error adding message to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
