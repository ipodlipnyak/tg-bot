import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseStatusEnum, RestListResponseDto, RestResponseDto } from './dto/rest-response.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TelegramEventMessageInputDto } from './dto/telegram.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    return {
      status: ResponseStatusEnum.ERROR,
      payload: [],
    };
  }
}
