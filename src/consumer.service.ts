import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { TelegramEventMessageInputDto } from 'src/dto/telegram.dto';
import { EventsGateway } from 'src/events.gateway';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private readonly logger = new Logger(ConsumerService.name);

  constructor(
    private configService: ConfigService,
    private eventsGateway: EventsGateway,
  ) {
    const connection = amqp.connect([this.configService.get('rabbitmq.url')]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue(this.configService.get('rabbitmq.queue'), { durable: true });

        await channel.consume(this.configService.get('rabbitmq.queue'), async (message) => {
          if (message) {
            const text: string = JSON.parse(message.content.toString());
            this.logger.debug(`Received message: ${ text || '' }`);
            this.eventsGateway.server.emit('blah', text);
            channel.ack(message);
          }
        });
      });
      this.logger.log('Consumer service started and listening for messages.');
    } catch (err) {
      this.logger.error('Error starting the consumer:', err);
    }
  }
}
