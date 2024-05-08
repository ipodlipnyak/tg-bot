import { TelegramMessageDto } from '@my/common';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class BotController {
    private readonly logger = new Logger(BotController.name);

    constructor() {}

    @MessagePattern('reply')
    ackMessageTestData(data: TelegramMessageDto) {
      debugger
      this.logger.debug(data.toString());
      return 'Message Received';
    }
}
