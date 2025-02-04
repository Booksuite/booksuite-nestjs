import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService1 {
  getHello(): string {
    return 'Hello World!';
  }
}
