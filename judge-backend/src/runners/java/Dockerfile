FROM eclipse-temurin:17-jdk-alpine

RUN apk add --no-cache coreutils

WORKDIR /app

COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

ENTRYPOINT ["/app/run.sh"]