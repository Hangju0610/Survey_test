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

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions, {
    // Survey가 없어질 경우, 모든 문항이 제거될 수 있도록 cascade를 remove로 설정
    // update가 되도 변경되도록 진행
    cascade: ['remove', 'update'],
  })
  survey: SurveyEntity;

  // entity에 명시적으로 관계가 있는 테이블의 ID를 적어넣기 위해 사용되는 Relationid
  @RelationId((question: QuestionEntity) => question.survey)
  surveyId: number;

  @Column()
  content: string;

  // PostgreSQL의 데이터에 배열로 넣을 시, array 항목을 만들어준다.
  // 또한 타입을 넣어줘야 한다.
  @Column('text', { array: true, nullable: true })
  select: string[];

  @Column('int', { array: true, nullable: true })
  score: number[];
}
