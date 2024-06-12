# 이미지를 가져옵니다.
FROM node:14 as builder

# 작업 디렉토리를 설정합니다.
WORKDIR /app

# 소스 코드를 복사합니다.
COPY . .

# 애플리케이션 종속성을 설치합니다.
RUN npm install

# 애플리케이션을 빌드합니다.
RUN npm run build:live

EXPOSE 3000

CMD ["npm", "start"]
