import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  surveyId: number;

  @Field({ description: '질문 내용', nullable: true })
  content?: string;

  @Field({ description: '선택지', nullable: true })
  select?: string[];

  @Field({ description: '선택지 별 점수', nullable: true })
  score?: number[];
}
