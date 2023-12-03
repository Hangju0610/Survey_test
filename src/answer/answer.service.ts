import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundAnswerException } from 'src/common/exceptions/answer.exception';
import { AnswerEntity } from 'src/database/entities/answer.entity';
import { QuestionEntity } from 'src/database/entities/question.entity';
import { CreateAnswer, UpdateAnswer } from 'src/schema/answer.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  // 답변 생성
  async createAnswer(answerData: CreateAnswer) {
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

  // 답변 수정
  async updateAnswer(answerData: UpdateAnswer) {
    const { id, surveyId, user, questionId, answer } = answerData;
    // 과거와 답변이 같은지, 같지 않은지 확인하는 작업 진행
    // 1. 전 답변을 먼저 찾는다.
    const oldAnswer = await this.answerRepository.findOneBy({
      id,
    });
    let { score, totalScore } = oldAnswer;
    // 변경할 답변의 문항 Id
    const changeQuestionId: number[] = [];
    // 변경된 답변
    const changeAnswer: number[] = [];
    // 변경할 점수의 index
    const changeIndex: number[] = [];

    // 2. 배열을 순회하며 새로운 답변과 과거 답변이 일치하는지 확인한다.
    oldAnswer.answer.forEach((v, idx) => {
      // 일치하지 않는다면 변경 진행
      if (v !== answer[idx]) {
        // 변경할 내역의 문항 Id, 답변 내역, 순서를 넣는다.
        changeQuestionId.push(questionId[idx]);
        changeAnswer.push(answer[idx]);
        changeIndex.push(idx);
      }
    });
    // 3. 변경할 답변의 문항이 있다면
    if (changeQuestionId.length !== 0) {
      // 변경할 문항만 점수 확인 진행
      const changeScore = await this.measureScore(
        changeQuestionId,
        changeAnswer,
        surveyId,
      );
      // 변경한 내역을 반복문을 돌려 넣어둔다.
      changeIndex.forEach((v, idx) => {
        score[v] = changeScore[idx];
      });
      totalScore = score.reduce((acc, cur) => {
        return acc + cur;
      }, 0);
    }
    // 4. update 진행
    await this.answerRepository.update(
      {
        id,
      },
      {
        user,
        answer,
        score,
        totalScore,
      },
    );
    const newAnswer = this.answerRepository.findOneBy({ id });
    return newAnswer;
  }

  // 모든 답변 찾기 메서드
  async allAnswers() {
    return await this.answerRepository.find();
  }

  // 답변 찾기 메서드
  async findAnswer(id: number) {
    const answer = await this.answerRepository.findOneBy({ id });
    if (!answer) throw new NotFoundAnswerException();
    return answer;
  }

  // 답변 삭제 메서드
  async deleteAnswer(id: number) {
    const result = await this.answerRepository.delete(id);
    if (result.affected == 0) throw new NotFoundAnswerException();
    return { success: true, message: '답변 삭제 완료' };
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
