import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Question } from './question.schema';

@ObjectType({ description: '설문지 조회 Type' })
export class Survey {
  @Field(() => Int, { description: '설문지 Id' })
  id: number;

  @Field({ nullable: true, description: '설문지 제목' })
  title?: string;

  @Field({ nullable: true, description: '설문지 상세 요약글' })
  description?: string;

  @Field(() => [Question], {
    nullable: 'itemsAndList',
    description: '설문지 내 문항 확인',
  })
  questions?: Question[];
}

// Input용 Schema
@InputType({ description: '설문지 생성 Type' })
export class CreateSurvey {
  @Field({ description: '설문지 제목' })
  title: string;

  @Field({ description: '설문지 상세 요약글' })
  description: string;
}

@InputType({ description: '설문지 수정 Type' })
export class UpdateSurvey {
  @Field(() => Int, { description: '설문지 Id' })
  id: number;

  @Field({ nullable: true, description: '설문지 제목' })
  title?: string;

  @Field({ nullable: true, description: '설문지 상세 요약글' })
  description: string;
}
