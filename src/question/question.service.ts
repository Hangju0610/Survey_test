import { NotFoundQuestionException } from './../common/exceptions/question.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { CreateQuestion, UpdateQuestion } from 'src/schema/question.schema';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  // 전체 설문지 조회 메서드
  async getAllQuestions() {
    return this.questionRepository.find();
  }

  // 설문지별 문항 조회 메서드
  async getSurveyQuestions(surveyId: number) {
    return this.questionRepository.find({
      where: { survey: { id: surveyId } },
    });
  }

  // 단일 문항 조회 메서드
  async getQuestion(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new NotFoundQuestionException();
    return question;
  }

  // 문항 생성
  async createQuestion(data: CreateQuestion) {
    const question = this.questionRepository.create({
      // 관계를 명시하기 위해 id 값 입력
      survey: {
        id: data.surveyId,
      },
      content: data.content,
      select: data.select,
      score: data.score,
    });
    return await this.questionRepository.save(question);
  }

  // 문항 수정 메서드
  async updateQuestion(data: UpdateQuestion) {
    const result = await this.questionRepository.update(
      { id: data.id },
      {
        survey: { id: data.surveyId },
        content: data.content,
        select: data.select,
        score: data.score,
      },
    );
    if (result.affected == 0) throw new NotFoundQuestionException();
    return await this.getQuestion(data.id);
  }

  // 문항 삭제
  async deleteQuestion(id: number) {
    const result = await this.questionRepository.delete(id);
    if (result.affected == 0) throw new NotFoundQuestionException();
    return { success: true, message: '문항 삭제 완료' };
  }
}
