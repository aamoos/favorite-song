# 이미지를 가져옵니다.
FROM node:14 as builder

# 작업 디렉토리를 설정합니다.
WORKDIR /home/ubuntu/app/frontend

# 소스 코드를 복사합니다.
COPY . .

# 애플리케이션 종속성을 설치합니다.
RUN npm install

# 애플리케이션을 빌드합니다.
RUN npm run build:live

# Nginx로 서빙할 정적 파일을 설정합니다.
FROM nginx:alpine

# Nginx에 정적 파일을 추가합니다.
COPY --from=builder /home/ubuntu/app/frontend/dist /usr/share/nginx/html
