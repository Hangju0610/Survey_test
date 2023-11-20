import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  surveyId: number;

  @Field({ description: '질문 내용', nullable: true })
  content?: string;

  // 스키마를 Array 배열로 받고 싶은 경우, []을 넣어 Array라고 나타내준다.
  // 또한 내부에 타입을 적어줘야 한다.
  @Field(() => [String], { description: '선택지', nullable: true })
  select?: string[];

  @Field(() => [Int], { description: '선택지 별 점수', nullable: true })
  score?: number[];
}
