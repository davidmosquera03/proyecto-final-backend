# Ejecucion

## Modo 1: Todo en docker

```
npm install
npx prisma generate
docker-compose up -d --build
docker-compose exec api npx prisma migrate deploy
```

## Modo 2: solo db en docker, watch para backend

```
npm install
npx prisma generate
docker-compose up -d db
npx prisma migrate dev
npm run start:dev
```

```
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
```