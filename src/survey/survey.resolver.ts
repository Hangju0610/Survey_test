import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { InputSurvey, Survey } from 'src/schema/survey.schema';

@Resolver()
export class SurveyResolver {
  constructor(private surveyService: SurveyService) {}

  // 전체 Survey 조회
  @Query(() => [Survey])
  async getAllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  // 설문지 1개 조회
  // input을 통해 id를 받는다.
  @Query(() => Survey)
  async getSurvey(@Args('input') id: number) {
    return this.surveyService.getSurvey(id);
  }

  // Post Survey
  // 데이터 생성과 수정 진행
  @Mutation(() => Survey)
  async postSurvey(@Args('input') surveyData: InputSurvey) {
    return this.surveyService.postSurvey(surveyData);
  }
}
