import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const gqlContext = GqlExecutionContext.create(context);
    const ip = gqlContext.getContext().req.ip;
    const info = gqlContext.getInfo();
    // console.log(info);

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;

        this.logger.log(
          `IP: ${ip} - ${responseTime}ms`,
          `${info.path.typename}: ${info.fieldName}`,
        );
      }),
    );
  }
}
