import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { load } from './config';
import { EventsGateway } from './events.gateway';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'client/dist'),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('db'),
      }),
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    EventsGateway,
    ProducerService,
    ConsumerService,
  ],
})
export class AppModule {}
