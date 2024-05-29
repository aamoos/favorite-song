FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY /home/ubuntu/app/frontend/dist /usr/share/nginx/html 
RUN npm run build
EXPOSE 80
CMD ["npx", "serve", "-s", "dist"]
