FROM openjdk:17-alpine
WORKDIR /runner
COPY run.sh /runner/run.sh
RUN chmod +x /runner/run.sh
ENTRYPOINT ["/runner/run.sh"]