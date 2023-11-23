import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer, InputAnswer } from 'src/schema/answer.schema';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Mutation(() => Answer)
  async createAnswer(@Args('input') answerData: InputAnswer) {
    // 문항 개수와 답변 개수 일치여부 확인
    if (answerData.questionId.length !== answerData.answer.length)
      throw new BadRequestException('문항 수와 답변 수가 일치하지 않습니다.');
    return this.answerService.createAnswer(answerData);
  }
  @Mutation(() => Answer)
  async updateAnswer(@Args('input') answerData: InputAnswer) {
    if (answerData.questionId.length !== answerData.answer.length)
      throw new BadRequestException('문항 수와 답변 수가 일치하지 않습니다.');
    return this.answerService.updateAnswer(answerData);
  }

  @Mutation(() => Boolean)
  async deleteAnswer(@Args('input') id: number) {
    return (await this.answerService.deleteAnswer(id)).success;
  }

  @Query(() => [Answer])
  async allAnswers() {
    return await this.answerService.allAnswers();
  }

  @Query(() => Answer)
  async answer(@Args('input') id: number) {
    return await this.answerService.findAnswer(id);
  }
}
