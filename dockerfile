FROM node:18-alpine

WORKDIR /app

COPY yarn.lock ./
COPY package.json ./

RUN yarn
COPY . .

ENV PORT 8080

EXPOSE 8080

CMD ["yarn", "start:dev"]