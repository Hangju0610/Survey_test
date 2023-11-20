import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/database/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
  ) {}

  async getAllSurvey() {
    return await this.surveyRepository.find();
  }

  async getSurvey(id: number) {
    const survey = await this.surveyRepository.findOneBy({ id });
    if (!survey) throw new BadRequestException('설문지를 찾을 수 없습니다.');
    return survey;
  }
}
