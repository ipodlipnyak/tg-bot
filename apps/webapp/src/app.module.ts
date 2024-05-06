import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProducerService } from './producer.service';
import { CommonModule } from '@my/common';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../../..', 'apps/webapp/client/dist'),
    }),
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
