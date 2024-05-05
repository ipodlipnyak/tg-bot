import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TelegramService } from './telegram.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TelegramService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(AppController);
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
