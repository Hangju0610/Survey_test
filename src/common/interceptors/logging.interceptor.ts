import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Response까지 timed 계산하기 위한 시간
    const now = Date.now();
    // gqlContext로 전환
    const gqlContext = GqlExecutionContext.create(context);
    // Ip 접근용 Context 변환
    const ip = gqlContext.getContext().req.ip;
    // path와 fieldName을 얻기 위한 info
    const info = gqlContext.getInfo();

    // tap을 통해 Response가 끝나는 경우 응답 처리 진행
    return next.handle().pipe(
      tap(() => {
        // Response time 계산
        const responseTime = Date.now() - now;

        // info level로 logger 진행
        this.logger.log({
          // context는 path와 fieldName으로
          context: `${info.path.typename}: ${info.fieldName}`,
          // message는 IP 주소와 Response time으로 진행
          message: `IP: ${ip} - ${responseTime}ms`,
        });
      }),
    );
  }
}
