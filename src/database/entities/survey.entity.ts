import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuestionEntity } from './question.entity';
import { AnswerEntity } from './answer.entity';

@Entity()
export class SurveyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => QuestionEntity, (question) => question.survey)
  questions: QuestionEntity[];

  @OneToMany(() => AnswerEntity, (answer) => answer.survey)
  answers: AnswerEntity[];
}
