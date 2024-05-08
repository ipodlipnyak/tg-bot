import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProducerService } from './producer.service';
import { CommonModule } from '@my/common';
import { EventsGateway } from './events.gateway';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../..', 'apps/webapp/client/dist'),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'tg-rmq-client',
          inject: [ConfigService],
          useFactory: async (configService: ConfigService ) => ({
            transport: Transport.RMQ,
            options: {
              urls: [
                await configService.get('rabbitmq.url') as string,
              ],
              queue: await configService.get('rabbitmq.queueTg'),
            }
          }),
        }
      ]
    }),
    CommonModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    EventsGateway,
    ProducerService,
    ConsumerService,
  ],
})
export class AppModule {}
