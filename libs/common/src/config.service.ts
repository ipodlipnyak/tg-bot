
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonConfigService {
  private readonly logger = new Logger(CommonConfigService.name);

  constructor(
    private configService: ConfigService,
  ) {}

  public async get(propertyPath: string) {
    return this.configService.get(propertyPath);
  }
}
