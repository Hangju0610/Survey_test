import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer, CreateAnswer, UpdateAnswer } from 'src/schema/answer.schema';
import { BadRequestException } from '@nestjs/common';
import { CustomResponse } from 'src/schema/common.schema';
import { Survey } from 'src/schema/survey.schema';
import { SurveyService } from 'src/survey/survey.service';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(
    private answerService: AnswerService,
    private surveyService: SurveyService,
  ) {}

  // 답변 생성
  @Mutation(() => Answer, { description: '답변 생성' })
  async createAnswer(@Args('input') answerData: CreateAnswer) {
    // 문항 개수와 답변 개수 일치여부 확인
    if (answerData.questionId.length !== answerData.answer.length)
      throw new BadRequestException('문항 수와 답변 수가 일치하지 않습니다.');
    return this.answerService.createAnswer(answerData);
  }

  // 답변 수정
  @Mutation(() => Answer, { description: '답변 수정' })
  async updateAnswer(@Args('input') answerData: UpdateAnswer) {
    if (answerData.questionId.length !== answerData.answer.length)
      throw new BadRequestException('문항 수와 답변 수가 일치하지 않습니다.');
    return this.answerService.updateAnswer(answerData);
  }

  // 답변 삭제
  @Mutation(() => CustomResponse, { description: '답변 삭제' })
  async deleteAnswer(@Args('id') id: number) {
    return await this.answerService.deleteAnswer(id);
  }

  // 전체 답변 조회
  @Query(() => [Answer], { description: '전체 답변 조회' })
  async allAnswers() {
    return await this.answerService.allAnswers();
  }

  // 단일 답변 조회
  @Query(() => Answer, { description: '단일 답변 조회' })
  async answer(@Args('input') id: number) {
    return await this.answerService.findAnswer(id);
  }

  //ResolveField를 통해 Survey를 찾기
  @ResolveField(() => Survey, {
    description: '답변 및 설문지 조회 시 ResolveField',
  })
  async survey(@Parent() answer: Answer) {
    const surveyId = answer.surveyId;
    return this.surveyService.getSurvey(surveyId);
  }
}
