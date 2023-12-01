import { HttpException } from '@nestjs/common';
import { IBaseException } from '../interfaces/base.exception.interface';
import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

export class BaseException extends GraphQLError implements IBaseException {
  constructor(errorCode: string, message: string, statusCode: number) {
    super(message);
    // extension에 추가할 내용
    this.extensions.errorCode = errorCode;
    this.extensions.code = statusCode;
    this.extensions.timestamp = new Date().toLocaleString();
  }
  errorCode: string;
  message: string;
  statusCode: number;
  extensions: GraphQLErrorExtensions;
}
