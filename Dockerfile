FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run build
COPY ./frontend/dist/ /usr/share/nginx/html 
EXPOSE 80
CMD ["npx", "serve", "-s", "dist"]
