import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/aaa')
  getHello(): string {
    return this.appService.aaa();
  }
}
