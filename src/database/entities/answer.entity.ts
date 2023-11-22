import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SurveyEntity } from './survey.entity';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userName: string;

  // surveyId가 출력되는지 Test 진행
  @ManyToOne(() => SurveyEntity, (survey) => survey.answers)
  @JoinColumn({ name: 'surveyId', referencedColumnName: 'id' })
  survey: SurveyEntity;

  @Column('int', { array: true, nullable: false })
  questionId: number[];

  @Column('int', { array: true, nullable: false })
  answer: number[];

  @Column('int', { array: true, nullable: false })
  score: number[];

  @Column({ nullable: false })
  totalScore: number;
}
