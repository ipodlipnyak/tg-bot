import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProducerService } from './producer.service';
import { HttpModule } from '@nestjs/axios';
import { CommonModule, EventsGateway } from '@my/common';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'apps/webapp/client/dist'),
    }),
    HttpModule,
    CommonModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    EventsGateway,
    ProducerService,
  ],
})
export class AppModule {}
