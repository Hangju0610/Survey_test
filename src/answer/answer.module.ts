import { Module } from '@nestjs/common';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/database/entities/answer.entity';
import { QuestionEntity } from 'src/database/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity, QuestionEntity])],
  providers: [AnswerResolver, AnswerService],
})
export class AnswerModule {}
