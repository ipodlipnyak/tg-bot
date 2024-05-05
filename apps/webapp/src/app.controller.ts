import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ResponseStatusEnum, RestListResponseDto, RestResponseDto } from './dto/rest-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MessagesListResponseDto, TelegramEventMessageInputDto } from './dto/telegram.dto';
import { TelegramService } from './telegram.service';
import { Message } from './models';

@Controller('tg')
export class AppController {
  constructor(
    private readonly telegramService: TelegramService
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
    this.telegramService.saveMessage(input.message);

    result.status = ResponseStatusEnum.SUCCESS;
    return result;
  }
}
