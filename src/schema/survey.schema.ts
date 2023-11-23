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
export class CreateSurvey {
  @Field()
  title: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateSurvey {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description: string;
}
