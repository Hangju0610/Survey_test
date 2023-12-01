import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { BaseException } from '../exceptions/base.exception';
import { UnCatchedException } from '../exceptions/uncatched.exception';

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    // gql 전용 context로 변경하기.
    // https://docs.nestjs.com/graphql/other-features
    // console.log(exception);
    // console.log(typeof exception);
    // console.log(exception.stack);
    // console.log(exception.message);
    // console.log(Object.getOwnPropertyDescriptors(exception));
    // console.log(Object.values(exception));
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();
    const ip = gqlHost.getContext().req.ip;

    if (exception instanceof BaseException) {
      this.logger.warn({
        context: 'CustomHandler',
        message: exception.message,
        ip,
        extensions: exception.extensions,
        typename: info.path.typename,
        path: info.fieldName,
      });
      return exception;
    } else {
      const newException = new UnCatchedException(exception.message);
      this.logger.error(newException);
      return newException;
    }
  }
}
