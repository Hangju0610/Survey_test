import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/database/entities/answer.entity';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { InputAnswer } from 'src/schema/answer.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async createAnswer(answerData: InputAnswer) {
    // 콜백 함수 비동기 처리 진행
    const score = await this.measureScore(
      answerData.questionId,
      answerData.answer,
      answerData.surveyId,
    );
    const totalScore = score.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    const newAnswer = this.answerRepository.create({
      user: answerData.user,
      score,
      survey: {
        id: answerData.surveyId,
      },
      questionId: answerData.questionId,
      answer: answerData.answer,
      totalScore,
    });

    return this.answerRepository.save(newAnswer);
  }

  // 점수 측정 메서드
  async measureScore(
    question: number[],
    answer: number[],
    surveyId: number,
  ): Promise<number[]> {
    // 내부 콜백 함수 비동기로 진행
    const score = question.map(async (v, idx) => {
      // question에서 점수를 찾기 위해 find 메서드 진행
      const question = await this.questionRepository.findOneBy({ id: v });
      if (!question || surveyId !== question.surveyId)
        throw new BadRequestException('잘못된 문항을 선택했습니다.');
      const choice = answer[idx];
      if (choice < 0 || choice >= question.score.length)
        throw new BadRequestException('없는 선택지 입니다.');
      return question.score[choice];
    });
    // 비동기 처리 진행 된 데이터의 결과를 기다리기 위해 Promise.all을 사용.
    const scores = await Promise.all(score);
    return scores;
  }
}
