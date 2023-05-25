FROM node:18.16.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --silent

COPY . /app

CMD npm start
