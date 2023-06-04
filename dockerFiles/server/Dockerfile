
FROM gradle:latest AS BUILD
WORKDIR /usr/app/
COPY ../../API .
RUN ./gradlew buildNeeded -Dselenide.headless=true -Dselenide.browser=firefox --no-daemon --parallel --console=plain --build-cache

# Package stage

FROM openjdk:11
ENV JAR_NAME=api.jar
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=BUILD $APP_HOME .
EXPOSE 8080
ENTRYPOINT exec java -jar $APP_HOME/build/libs/$JAR_NAME 