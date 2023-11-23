import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;

        this.logger.info(
          `${info.path.typename}: ${info.fieldName} - ${responseTime}ms`,
          {
            context: 'LoggingInterceptor',
            timestamp: new Date().toISOString(),
          },
        );
      }),
      catchError((error) => {
        this.logger.error(
          `Error in ${info.path.typename}: ${info.fieldName} - Error: ${error.message}`,
          {
            context: 'LoggingInterceptor',
            timestamp: new Date().toISOString(),
            error: {
              message: error.message,
              stack: error.stack,
            },
          },
        );

        return throwError(error);
      }),
    );
  }
}
