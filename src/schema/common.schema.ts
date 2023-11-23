import { Field, ObjectType } from '@nestjs/graphql';

// 삭제 완료 시 응답 메세지 작성
@ObjectType({ description: '삭제 완료 시 응답 메세지' })
export class CustomResponse {
  @Field({ description: '삭제 성공 여부' })
  success: boolean;

  @Field({ description: '삭제 메세지' })
  message: string;
}
