import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './database/dataSource';

@Module({
  imports: [
    // GraphQL을 사용하기 위한 초기 설정
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // 서버는 apollo 서버를 사용
      driver: ApolloDriver,
      playground: true,
      // 스키마자동 생성 진행
      // schema를 Entity나 DTO를 통해 자동으로 읽어, gql 파일 생성
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    TypeOrmModule.forRoot({ ...dataSourceOption }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
