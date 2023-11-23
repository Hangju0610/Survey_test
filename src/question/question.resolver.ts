import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateQuestion,
  Question,
  UpdateQuestion,
} from 'src/schema/question.schema';
import { QuestionService } from './question.service';
import { BadRequestException } from '@nestjs/common';
import { CustomResponse } from 'src/schema/common.schema';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  // 전체 문항 조회
  @Query(() => [Question], { description: '전체 문항 조회' })
  async allQuestion() {
    return this.questionService.getAllQuestions();
  }

  // 단일 문항 조회
  @Query(() => Question, { description: '단일 문항 조회' })
  async question(@Args('questionId') id: number) {
    return this.questionService.getQuestion(id);
  }

  // 문항 생성 Mutation
  @Mutation(() => Question, { description: '문항 생성' })
  async createQuestion(@Args('input') createQuestionData: CreateQuestion) {
    // 선택지 개수와 점수 배열 개수가 같지 않은 경우 에러 발생
    if (createQuestionData.select.length !== createQuestionData.score.length) {
      throw new BadRequestException('선택지와 점수의 개수가 같지 않습니다.');
    }
    return this.questionService.createQuestion(createQuestionData);
  }

  @Mutation(() => Question, { description: '문항 수정' })
  async updateQuestion(@Args('input') updateQuestionData: UpdateQuestion) {
    // 선택지 개수와 점수 배열 개수가 같지 않은 경우 에러 발생
    if (updateQuestionData.select.length !== updateQuestionData.score.length) {
      throw new BadRequestException('선택지와 점수의 개수가 같지 않습니다.');
    }
    return this.questionService.updateQuestion(updateQuestionData);
  }

  // 문항 삭제 Mutation
  @Mutation(() => CustomResponse, { description: '문항 삭제' })
  async deleteQuestion(@Args('questionId') id: number) {
    return await this.questionService.deleteQuestion(id);
  }
}
