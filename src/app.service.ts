import { Injectable } from '@nestjs/common';
import { Messages } from './main/constants/api.constants';

@Injectable()
export class AppService {
  getHello(): string {
    return Messages.HELLO_WORLD;
  }
}
