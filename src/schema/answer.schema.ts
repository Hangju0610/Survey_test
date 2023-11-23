import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Survey } from './survey.schema';

@InputType({ description: '답변 생성 Type' })
export class CreateAnswer {
  @Field({ description: '유저 이름' })
  user: string;

  @Field(() => Int, { description: '설문지 Id' })
  surveyId: number;

  @Field(() => [Int], { description: '문항 Id' })
  questionId: number[];

  @Field(() => [Int], { description: '답변 내역' })
  answer: number[];
}

@InputType({ description: '답변 업데이트 Type' })
export class UpdateAnswer {
  @Field(() => Int)
  id: number;

  @Field({ description: '유저 이름', nullable: true })
  user?: string;

  @Field(() => Int, { description: '설문지 Id', nullable: true })
  surveyId?: number;

  @Field(() => [Int], { description: '문항 Id', nullable: true })
  questionId?: number[];

  @Field(() => [Int], { description: '답변 내역', nullable: true })
  answer?: number[];
}

@ObjectType()
export class Answer {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  user?: string;

  @Field(() => Int)
  surveyId: number;

  @Field(() => [Int])
  questionId?: number[];

  @Field(() => [Int])
  answer?: number[];

  @Field(() => [Int])
  score?: number[];

  @Field(() => Int)
  totalScore?: number;

  @Field(() => Survey, { nullable: true })
  survey?: Survey;
}
