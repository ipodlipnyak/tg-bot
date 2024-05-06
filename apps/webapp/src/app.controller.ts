import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Message, MessagesListResponseDto, ResponseStatusEnum, RestListResponseDto, RestResponseDto, TelegramEventMessageInputDto } from '@my/common';
import { ProducerService } from './producer.service';

@Controller('tg')
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    private producerService: ProducerService,
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
  @ApiResponse({ status: 200, type: RestListResponseDto })
  @Post('/message')
  async newMessage(
    @Body() input: TelegramEventMessageInputDto,
  ): Promise<RestResponseDto> {
    const result = {
      status: ResponseStatusEnum.ERROR,
    };

    const text = input?.message?.text;

    if (!text) {
      throw new HttpException('No text in this message', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.producerService.addToQueue(input.message);
      const messageModel = new Message();
      messageModel.content = input.message.text;
      messageModel.chatid = input.message.chat.id;
      await messageModel.save();
      await messageModel.reload();
    } catch (e) {
      this.logger.debug(e);
    }


    result.status = ResponseStatusEnum.SUCCESS;
    return result;
  }
}
