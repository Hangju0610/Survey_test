import { Module } from '@nestjs/common';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/database/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  providers: [QuestionResolver, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
