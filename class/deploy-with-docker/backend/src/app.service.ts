import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  aaa(): string {
    return 'Hello World!';
  }
}
