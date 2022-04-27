import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject('AUTH_SERVICE')
    private readonly clientAuthService: ClientProxy,

    @Inject('RESOURCE_SERVICE')
    private readonly clientResourceService: ClientProxy,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/auth/login')
  login() {
    return this.clientAuthService.send({ cmd: 'aaa' }, { name: '철수' });
  }

  @Get('/boards')
  fetchBoards() {
    return this.clientResourceService.send({ cmd: 'bbb' }, { age: 13 });
  }
}
