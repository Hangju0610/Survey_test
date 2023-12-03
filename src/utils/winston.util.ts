import { WinstonModule, utilities } from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import * as winston from 'winston';

// 로그 파일 저장소를 위한 path 지정
const logDir = __dirname + '/../../logs';

export const dailyOptions = (level: string) => {
  return {
    // level을 받는다.
    level,
    // date 패턴 작성
    datePattern: 'YYYY-MM-DD',
    // 파일이 생성될 위치
    dirname: logDir + `/${level}`,
    // 파일 이름
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, //30일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
    JSON: false,
  };
};

export const winstonLogger = WinstonModule.createLogger({
  levels: winston.config.npm.levels,
  // logger를 어디로 기록할 지 보내는 작성
  transports: [
    // console.log로 남기는 방법.
    new winston.transports.Console({
      // level 지정
      level: 'silly',
      // 로그가 어떻게 나올지 포맷 지정
      format: winston.format.combine(
        // 시간 표시
        winston.format.timestamp(),
        // nest처럼 나오게 하는 format
        // 첫번째 인자는 app의 이름을 작성
        // 두번째 인자는 속성 작성
        utilities.format.nestLike('Survey', {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),
    // transport에 winstonDaily 추가
    new winstonDaily(dailyOptions('silly')),
  ],
});
