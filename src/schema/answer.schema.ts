import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class InputAnswer {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  user: string;

  @Field(() => Int)
  surveyId: number;

  @Field(() => [Int])
  questionId: number[];

  @Field(() => [Int])
  answer: number[];
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
  questionId: number[];

  @Field(() => [Int])
  answer: number[];

  @Field(() => [Int])
  score: number[];

  @Field(() => Int)
  totalScore: number;
}
