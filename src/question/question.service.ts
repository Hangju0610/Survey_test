import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { InputQuestion, InputSelect } from 'src/schema/question.schema';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  // 설문지별 문항 조회 메서드
  async getAllQuestions(surveyId: number) {
    return this.questionRepository.find({
      where: { survey: { id: surveyId } },
    });
  }

  // 단일 문항 조회 메서드
  async getQuestion(id: number) {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) throw new BadRequestException('문항을 찾을 수 없습니다.');
    return question;
  }

  // 문항 생성
  async createQuestion(questionData: InputQuestion) {
    const data = this.questionRepository.create({
      // 관계를 명시하기 위해 id 값 입력
      survey: {
        id: questionData.surveyId,
      },
      content: questionData.content,
    });
    return await this.questionRepository.save(data);
  }

  // 문항 수정 및 선택지 생성 및 수정 메서드
  async updateQuestion(data: InputQuestion | InputSelect) {
    await this.getQuestion(data.id);
    return this.questionRepository.save(data);
  }

  // 문항 삭제
  async deleteQuestion(id: number) {
    const result = await this.questionRepository.delete(id);
    if (result.affected == 0)
      throw new BadRequestException('문항을 찾을 수 없습니다.');
    return { success: true };
  }
}
