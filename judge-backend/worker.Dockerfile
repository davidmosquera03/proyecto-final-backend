FROM node:18

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y docker.io

COPY package*.json ./
RUN npm install -g @nestjs/cli && npm install

COPY . .
RUN npx prisma generate

CMD npx prisma migrate deploy && npm run start:worker
