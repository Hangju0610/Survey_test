## Dockerfile
## Nest.JS의 TS 파일을 JS로 컴파일을 진행한다.
FROM node:18-alpine
## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다.
WORKDIR /app
COPY . .
## 새로운 레이어에서 명령어를 실행하고, 새로운 이미지를 생성한다.
RUN npm ci
RUN npm i pm2 -g
RUN npm run build
## Dockerfile 빌드로 생성된 이미지에서 열어줄 포트를 의미한다.
EXPOSE 4000
## 컨테이너를 생성 및 실행 할 때 실행할 명령어
## container를 띄울 때 Port를 지정해 줄 것이기 때문에 필요 없을 수도
CMD ["pm2-runtime","start","dist/main.js"]