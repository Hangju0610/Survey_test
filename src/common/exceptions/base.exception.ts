import { IBaseException } from '../interfaces/base.exception.interface';
import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

export class BaseException extends GraphQLError implements IBaseException {
  constructor(errorCode: string, message: string, statusCode: number) {
    super(message);
    // extension에 추가할 내용
    // 에러 코드 추가
    this.extensions.errorCode = errorCode;
    // http 상태 코드 추가
    this.extensions.code = statusCode;
    // timestamp 추가
    this.extensions.timestamp = new Date().toLocaleString();
  }
  message: string;
  extensions: GraphQLErrorExtensions;
}
