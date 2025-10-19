FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

# Ejecuta migraciones antes de iniciar
CMD npx prisma migrate deploy && npm run start:dev