import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { errorCode } from './codeError.enum';

export class NotFoundAnswerException extends BaseException {
  constructor() {
    super(
      errorCode.NotFoundAnswer,
      '답변을 찾을 수 없습니다',
      HttpStatus.NOT_FOUND,
    );
  }
}

export class NotEqualQuestionAndAnswer extends BaseException {
  constructor() {
    super(
      errorCode.NotEqualQuestionAndAnswer,
      '문항 수와 답변이 일치하지 않습니다',
      HttpStatus.BAD_REQUEST,
    );
  }
}
