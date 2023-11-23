import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
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

  // 답변 생성
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

  // 답변 수정
  async updateAnswer(answerData: InputAnswer) {
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
    } else {
      throw new BadRequestException('변경 사항이 없습니다.');
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
