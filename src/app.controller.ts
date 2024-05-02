import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseStatusEnum, RestResponseDto } from './dto/rest-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): RestResponseDto {
    return {
      status: ResponseStatusEnum.SUCCESS,
    };
  }
}
