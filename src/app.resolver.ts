import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly logger: Logger) {}
  @Query(() => String)
  async test() {
    this.logger.fatal('Fatal');
    this.logger.log('Log');
    this.logger.error('Error');
    this.logger.warn('Warn');
    this.logger.verbose('verbose');
    this.logger.debug('debug');
    throw Error('심각한 에러!');
    return 'hello GQL';
  }
}
