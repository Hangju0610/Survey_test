import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '마음연구소 코딩테스트 과제 진행';
  }
}
