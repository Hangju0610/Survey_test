import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { errorCode } from './codeError.enum';

export class UnCatchedException extends BaseException {
  constructor(message: string) {
    super(errorCode.UnCatched, message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
