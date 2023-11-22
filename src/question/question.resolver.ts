import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  InputQuestion,
  InputSelect,
  Question,
} from 'src/schema/question.schema';
import { QuestionService } from './question.service';
import { BadRequestException } from '@nestjs/common';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private questionService: QuestionService) {}

  // 단일 문항 조회
  @Query(() => Question)
  async question(@Args('input') id: number) {
    return this.questionService.getQuestion(id);
  }

  // 문항 생성 및 수정 Mutation
  @Mutation(() => Question)
  async postQuestion(@Args('input') questionData: InputQuestion) {
    // id를 입력하지 않는 경우 create로 진행
    if (!questionData.id) {
      return this.questionService.createQuestion(questionData);
    } else {
      // id 값이 있는 경우 Update로 진행
      return this.questionService.updateQuestion(questionData);
    }
  }

  // 문항 삭제 Mutation
  @Mutation(() => Boolean)
  async deleteQuestion(@Args('input') id: number) {
    return (await this.questionService.deleteQuestion(id)).success;
  }

  // Select API CUR 설계 진행
  // 선택지 생성, 수정 Mutation
  @Mutation(() => Question)
  async postSelect(@Args('input') selectData: InputSelect) {
    // 선택지 개수와 점수 배열 개수가 같지 않은 경우 에러 발생
    if (selectData.select.length !== selectData.score.length) {
      throw new BadRequestException('선택지와 점수의 개수가 같지 않습니다.');
    }
    return await this.questionService.updateQuestion(selectData);
  }
}
