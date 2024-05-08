import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Message, MessagesListResponseDto, ResponseStatusEnum, RestResponseDto, TelegramEventMessageInputDto } from '@my/common';
import { ProducerService } from './producer.service';
import { ConfigService } from '@nestjs/config';

@Controller('tg')
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    private producerService: ProducerService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: 'Get saved messages list' })
  @ApiResponse({ status: 200, type: MessagesListResponseDto })
  @Get('')
  async getMessages(): Promise<MessagesListResponseDto> {
    const result: MessagesListResponseDto = {
      status: ResponseStatusEnum.ERROR,
      payload: [],
      total: 0,
      offset: 0,
      limit: 0
    };

    const messagesList = await Message.find({
      order: {
        'created': 'DESC',
        'id': 'ASC',
      },
      take: 10,
    });

    result.payload = messagesList.map((msg) => ({
      id: `${ msg.id }`,
      text: msg.content,
      chat_id: msg.chatid,
    }));
    result.total = result.payload.length;
    result.limit = result.payload.length;
    result.status = ResponseStatusEnum.SUCCESS;

    return result;
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, type: RestResponseDto })
  @Post('/message')
  newMessage(
    @Body() input: TelegramEventMessageInputDto,
  ): RestResponseDto {
    const result = {
      status: ResponseStatusEnum.ERROR,
    };

    const text = input?.message?.text;

    if (!text) {
      throw new HttpException('No text in this message', HttpStatus.BAD_REQUEST);
    }

    try {
      this.producerService.addToQueue(input.message);
    } catch (e) {
      this.logger.debug(e);
    }


    result.status = ResponseStatusEnum.SUCCESS;
    return result;
  }
}
