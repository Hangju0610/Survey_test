# 마음연구소 코딩테스트 과제

## 사용 기술

Typescript, Nest.js, GraphQL, typeORM, PostgreSQL, Winston

## 서비스 설명

- 객관식 설문지의 데이터베이스 설계
- 답변별 점수가 존재하며, 설문지는 답변을 체크할 수 있습니다.
- 답변의 총점을 확인할 수 있습니다.

## 서버 동작 방법

1. git clone 진행
2. terminal에 docker-compose build 명령어 입력
3. terminal에 docker-compose up -d 명령어 입력

## ERD

![ERD](./ERD_image.png)

- 선택지의 경우, Entity를 통해 생성할 시 DB의 Index 크기가 매우 커진다는 단점이 존재
- Postgres의 장점인 데이터 Type의 Array를 이용하여 Select, score, answer를 저장

## API 명세서

[API 명세서 Notion](https://hangjo0610.notion.site/f856e587a3ea4b5da2e128857c67fd89?v=3f5791dcca8e401c8a0111bd544b6157&pvs=4)

- 설문지 CRUD
- 문항 CRUD (문항 CRUD 내 선택지 CRUD를 구현)
- 답변 CRUD
- 설문지 완료 -> 답변 조회로 대체
- 완료된 설문지 확인 -> 답변 조회로 대체하였으며, ResolveField를 통해 survey 확인 가능
