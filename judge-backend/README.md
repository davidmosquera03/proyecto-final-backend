# Ejecucion

## Modo 1: Ejecutar backend

```
cd judge-backend
npm install
npx prisma generate
docker-compose up -d --build
docker-compose exec api npx prisma migrate deploy
```
