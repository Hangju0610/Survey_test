import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity()
export class SurveyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => QuestionEntity, (question) => question.survey)
  @JoinColumn()
  questions: QuestionEntity[];
}
