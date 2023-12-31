import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { CreateSurvey, Survey, UpdateSurvey } from 'src/schema/survey.schema';
import { Question } from 'src/schema/question.schema';
import { QuestionService } from 'src/question/question.service';
import { CustomResponse } from 'src/schema/common.schema';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService,
  ) {}

  // 전체 Survey 조회
  @Query(() => [Survey], { description: '전체 설문지 조회' })
  async AllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  // 설문지 1개 조회
  // input을 통해 id를 받는다.
  @Query(() => Survey, { description: '단일 설문지 조회' })
  async Survey(@Args('id') id: number) {
    return this.surveyService.getSurvey(id);
  }

  @ResolveField(() => [Question], { description: '문항 조회횽 ResolveField' })
  // @Parent 데코레이터를 사용해서 부모 인자를 받아올 수 있다.
  async questions(@Parent() survey: Survey) {
    const surveyId = survey.id;
    return this.questionService.getSurveyQuestions(surveyId);
  }

  // 설문지 생성
  @Mutation(() => Survey, { description: '설문지 생성' })
  async createSurvey(@Args('input') createSurveyData: CreateSurvey) {
    return this.surveyService.createSurvey(createSurveyData);
  }

  // 설문지 수정
  @Mutation(() => Survey, { description: '설문지 수정' })
  async updateSurvey(@Args('input') updateSurveyData: UpdateSurvey) {
    return this.surveyService.updateSurvey(updateSurveyData);
  }

  // 설문지 삭제
  @Mutation(() => CustomResponse, { description: '설문지 삭제' })
  async deleteSurvey(@Args('id') id: number) {
    return await this.surveyService.deleteSurvey(id);
  }
}
