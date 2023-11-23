import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { SurveyEntity } from './survey.entity';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user?: string;

  // surveyId가 출력되는지 Test 진행
  @ManyToOne(() => SurveyEntity, (survey) => survey.answers)
  survey: SurveyEntity;

  @RelationId((answer: AnswerEntity) => answer.survey)
  surveyId: number;

  @Column('int', { array: true, nullable: false })
  questionId: number[];

  @Column('int', { array: true, nullable: false })
  answer: number[];

  @Column('int', { array: true, nullable: false })
  score: number[];

  @Column({ nullable: false })
  totalScore: number;
}
