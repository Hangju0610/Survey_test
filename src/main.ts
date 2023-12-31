import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { winstonLogger } from './utils/winston.util';
import { AllExceptionFilter } from './common/filter/exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Nest에 내장되어 있는 logger에 winstonLogger 주입
    logger: winstonLogger,
  });
  app.useGlobalFilters(new AllExceptionFilter(winstonLogger));
  app.useGlobalInterceptors(new LoggingInterceptor(winstonLogger));

  await app.listen(4000);
}
bootstrap();
