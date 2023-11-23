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

@ObjectType({ description: '답변 조회 Type' })
export class Answer {
  @Field(() => Int, { description: '답변 Id' })
  id: number;

  @Field({ nullable: true, description: '답변 유저' })
  user?: string;

  @Field(() => Int, { description: '설문지 Id' })
  surveyId: number;

  @Field(() => [Int], { nullable: true, description: '문항 Id' })
  questionId?: number[];

  @Field(() => [Int], { nullable: true, description: '답변 내역' })
  answer?: number[];

  @Field(() => [Int], { nullable: true, description: '답변별 점수 내역' })
  score?: number[];

  @Field(() => Int, { nullable: true, description: '총 답변 점수' })
  totalScore?: number;

  @Field(() => Survey, { nullable: true, description: '완료된 설문지 확인용' })
  survey?: Survey;
}
