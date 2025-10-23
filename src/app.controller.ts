import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { statsService } from './Providers/stats.provider';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly statsService:statsService
  ) {}

  @Get('ping')
  getPing(): string {
    return this.appService.ping();
  }

  @Get()
  getIntroduction():string {
    return this.appService.introduction();
  }
}
