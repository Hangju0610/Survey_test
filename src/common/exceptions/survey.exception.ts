import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { errorCode } from './codeError.enum';

export class SurveyNotFoundException extends BaseException {
  constructor() {
    super(
      errorCode.NotFoundSurvey,
      '설문지를 찾을 수 없습니다.',
      HttpStatus.NOT_FOUND,
    );
  }
}
