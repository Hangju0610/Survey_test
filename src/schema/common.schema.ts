import { Field, ObjectType } from '@nestjs/graphql';

// 삭제 완료 시 응답 메세지 작성
@ObjectType()
export class CustomResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
