import { WinstonModule, utilities } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';

const logDir = __dirname + '/../../logs';

export const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, //30일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    JSON: false,
  };
};

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike('Survey', {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),
    new winstonDaily(dailyOptions('error')),
  ],
});
