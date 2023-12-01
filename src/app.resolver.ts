import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async test() {
    throw Error('심각한 에러!');
  }
}
