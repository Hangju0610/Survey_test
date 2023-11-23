import { Module } from '@nestjs/common';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/database/entities/survey.entity';
import { QuestionService } from 'src/question/question.service';
import { QuestionModule } from 'src/question/question.module';
import { QuestionEntity } from 'src/database/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurveyEntity, QuestionEntity]),
    QuestionModule,
  ],
  providers: [SurveyResolver, SurveyService, QuestionService],
})
export class SurveyModule {}
