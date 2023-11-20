import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { SurveyEntity } from './survey.entity';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // entity에 명시적으로 관계가 있는 테이블의 ID를 적어넣기 위해 사용되는 Relationid
  @RelationId((survey: SurveyEntity) => survey.questions)
  surveyId: number;

  @Column()
  content: string;

  @Column({ type: 'array', nullable: true })
  select: string[];

  @Column({ type: 'array', nullable: true })
  score: number[];

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions, {
    // Survey가 없어질 경우, 모든 문항이 제거될 수 있도록 cascade를 remove로 설정
    // update가 되도 변경되도록 진행
    cascade: ['remove', 'update'],
  })
  survey: SurveyEntity;
}
