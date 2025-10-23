import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  ping():string {
    return 'pong';
  }

  introduction() {
    return `This API Powered by NestJS is for handling Angelo Rafael F. Recio's To-Do-App`;
  }
}
