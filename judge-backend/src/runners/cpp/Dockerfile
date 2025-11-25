FROM alpine:3.19

RUN apk add --no-cache g++ libstdc++

WORKDIR /runner
COPY run.sh /runner/run.sh
RUN chmod +x /runner/run.sh

ENTRYPOINT ["/runner/run.sh"]
