import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { errorCode } from './codeError.enum';

export class NotFoundQuestionException extends BaseException {
  constructor() {
    super(
      errorCode.NotFoundQuestion,
      '문항을 찾을 수 없습니다.',
      HttpStatus.NOT_FOUND,
    );
  }
}

export class NotEqualSelectAndScoreException extends BaseException {
  constructor() {
    super(
      errorCode.NotEqualSelectAndScore,
      '선택지 수와 점수 개수가 다릅니다.',
      HttpStatus.BAD_REQUEST,
    );
  }
}
