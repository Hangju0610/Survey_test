import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { InputSurvey, Survey } from 'src/schema/survey.schema';
import { Question } from 'src/schema/question.schema';
import { QuestionService } from 'src/question/question.service';

@Resolver(() => Survey)
export class SurveyResolver {
  constructor(
    private surveyService: SurveyService,
    private questionService: QuestionService,
  ) {}

  // 전체 Survey 조회
  @Query(() => [Survey])
  async AllSurvey() {
    return this.surveyService.getAllSurvey();
  }

  // 설문지 1개 조회
  // input을 통해 id를 받는다.
  @Query(() => Survey)
  async Survey(@Args('input') id: number) {
    return this.surveyService.getSurvey(id);
  }

  @ResolveField(() => [Question])
  // @Parent 데코레이터를 사용해서 부모 인자를 받아올 수 있다.
  async questions(@Parent() survey: Survey) {
    const surveyId = survey.id;
    return this.questionService.getAllQuestions(surveyId);
  }

  // Post Survey
  // 데이터 생성과 수정 진행
  @Mutation(() => Survey)
  async postSurvey(@Args('input') surveyData: InputSurvey) {
    return this.surveyService.postSurvey(surveyData);
  }

  @Mutation(() => Boolean)
  async deleteSurvey(@Args('input') id: number) {
    return (await this.surveyService.deleteSurvey(id)).success;
  }
}
