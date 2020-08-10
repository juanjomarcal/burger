FROM node:latest

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY . .

CMD ['yarn', 'start']
