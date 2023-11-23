import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/database/entities/survey.entity';
import { CreateSurvey, UpdateSurvey } from 'src/schema/survey.schema';
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

  async createSurvey(data: CreateSurvey) {
    //save 메서드를 통해 insert 진행
    return await this.surveyRepository.save(data);
  }

  async updateSurvey(data: UpdateSurvey) {
    // 아이디 조회 진행
    // save 메서드를 통해 데이터 수정
    const result = await this.surveyRepository.update(
      { id: data.id },
      { title: data.title, description: data.description },
    );
    if (result.affected == 0)
      throw new BadRequestException('설문지를 찾을 수 없습니다.');
    return await this.getSurvey(data.id);
  }

  async deleteSurvey(id: number) {
    const result = await this.surveyRepository.delete(id);
    if (result.affected == 0)
      throw new BadRequestException('설문지를 찾을 수 없습니다.');
    return { success: true, message: '설문지 삭제 완료' };
  }
}
