import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Question } from './question.schema';

@ObjectType()
export class Survey {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Question], { nullable: 'itemsAndList' })
  questions?: Question[];
}

// Input용 Schema
@InputType()
export class InputSurvey {
  // 설문지 생성 시 id를 받지 않지만, 수정시에는 id를 받을 수 있도록 한다.
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
