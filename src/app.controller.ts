import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseStatusEnum, RestListResponseDto, RestResponseDto } from './dto/rest-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TelegramEventMessageInputDto } from './dto/telegram.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @ApiOperation({ summary: 'Get messages list' })
  @ApiResponse({ status: 200, type: RestListResponseDto })
  @Get()
  getMessages(): RestResponseDto {
    return {
      status: ResponseStatusEnum.ERROR,
      payload: [],
    };
  }

  @ApiOperation({ summary: '' })
  @ApiResponse({ status: 200, type: RestListResponseDto })
  @Post('/tg/message')
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
    this.appService.saveMessage(input.message.text)

    result.status = ResponseStatusEnum.SUCCESS;
    return result;
  }
}
