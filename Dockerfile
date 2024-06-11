# build stage
FROM node:lts-alpine as build-stage

# Install Vue CLI
RUN npm install -g @vue/cli

WORKDIR .
COPY package*.json ./
RUN sudo npm install
COPY . .
RUN npm run build:live

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage ./dist /usr/share/nginx/html