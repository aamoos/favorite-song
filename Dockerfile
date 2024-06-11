# build stage
FROM node:lts-alpine as build-stage

# Install Vue CLI
RUN npm install -g @vue/cli

# Set working directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vue.js application
RUN npm run build:live

# production stage
FROM nginx:stable-alpine as production-stage

# Copy built files from build stage to Nginx
COPY --from=build-stage /app/frontend/dist /usr/share/nginx/html
