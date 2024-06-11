# build stage
FROM node:lts-alpine as build-stage
WORKDIR .
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:live

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage ./dist /usr/share/nginx/html