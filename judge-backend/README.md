## Con Docker

```
npm install
npx prisma generate
docker-compose up -d --build
docker-compose exec api npx prisma migrate deploy
```

```
npm install
npx prisma generate
docker-compose up -d db
npx prisma migrate dev
npm run start:dev
```
