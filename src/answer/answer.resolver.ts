import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer, InputAnswer } from 'src/schema/answer.schema';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AnswerResolver {
  constructor(private answerService: AnswerService) {}

  @Mutation(() => Answer)
  async postAnswer(@Args('input') answerData: InputAnswer) {
    // 문항 개수와 답변 개수 일치여부 확인
    if (answerData.questionId.length !== answerData.answer.length)
      throw new BadRequestException('문항 수와 답변 수가 일치하지 않습니다.');
    if (!answerData.id) {
      return this.answerService.createAnswer(answerData);
    }
  }
}
