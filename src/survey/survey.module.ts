import { Module } from '@nestjs/common';
import { SurveyResolver } from './survey.resolver';
import { SurveyService } from './survey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/database/entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyEntity])],
  providers: [SurveyResolver, SurveyService],
})
export class SurveyModule {}
