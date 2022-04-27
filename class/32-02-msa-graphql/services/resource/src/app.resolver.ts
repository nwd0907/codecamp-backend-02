import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Resolver, Mutation, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Query(() => String)
  fetchBoards() {
    return 'fetchBoards에서 데이터 보내기 성공!!';
  }
}
