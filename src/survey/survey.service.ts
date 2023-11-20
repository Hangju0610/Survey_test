import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/database/entities/survey.entity';
import { InputSurvey } from 'src/schema/survey.schema';
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

  async postSurvey(data: InputSurvey) {
    // Save method는 해당하는 Id값이 있을 경우 데이터 수정을 하며,
    // 해당하는 데이터가 없는 경우 INSERT를 진행한다.
    const survey = await this.surveyRepository.save(data);
    return survey;
  }

  async deleteSurvey(id: number) {
    const result = await this.surveyRepository.delete(id);
    if (result.affected == 0)
      throw new BadRequestException('설문지를 찾을 수 없습니다.');
    return { success: true };
  }
}
