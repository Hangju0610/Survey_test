import { HttpException } from '@nestjs/common';
import { IBaseException } from '../interfaces/base.exception.interface';

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, message: string, statusCode: number) {
    super({ errorCode, message }, statusCode);
    this.errorCode = errorCode;
  }
  errorCode: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
}
