import { ArgumentsHost, Catch, LoggerService } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { BaseException } from '../exceptions/base.exception';
import { UnCatchedException } from '../exceptions/uncatched.exception';

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    // gql 전용 context로 변경하기.
    // https://docs.nestjs.com/graphql/other-features
    const gqlHost = GqlArgumentsHost.create(host);
    // host에서 info 정보를 받아와 path와 typename을 받아올 수 있다.
    const info = gqlHost.getInfo();
    const ip = gqlHost.getContext().req.ip;

    if (exception instanceof BaseException) {
      // 우리가 지정한 예외처리의 경우에는
      // customHandler로 들어가며, warn을 통해 명시한다.
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
      // 그 외의 에러처리의 경우
      // log를 error로 남겨 심각한 상태의 로그라고 남기며,
      // slack이나 다른 APM tool을 통해 알 수 있도록 할 수 있다.
      const newException = new UnCatchedException(exception.message);
      this.logger.error({
        context: 'FatalError',
        message: newException.message,
        stack: newException.stack,
        ip,
        extensions: newException.extensions,
        typename: info.path.typename,
        path: info.fieldName,
      });
      return newException;
    }
  }
}
