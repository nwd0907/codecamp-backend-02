import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  aaa(): string {
    return 'Hello World!';
  }
}
