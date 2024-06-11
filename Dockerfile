# build stage
FROM node:lts-alpine as build-stage

# Install Vue CLI
RUN npm install -g @vue/cli

#WORKDIR /home/ubuntu/app/frontend

#COPY package*.json ./
RUN npm cache clean --force
RUN npm install
#COPY . .
RUN npm run build:live

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /home/ubuntu/app/frontend/dist /usr/share/nginx/html