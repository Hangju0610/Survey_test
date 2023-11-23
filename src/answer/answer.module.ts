import { Module } from '@nestjs/common';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/database/entities/answer.entity';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { SurveyService } from 'src/survey/survey.service';
import { SurveyEntity } from 'src/database/entities/survey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerEntity, QuestionEntity, SurveyEntity]),
    SurveyModule,
  ],
  providers: [AnswerResolver, AnswerService, SurveyService],
})
export class AnswerModule {}
