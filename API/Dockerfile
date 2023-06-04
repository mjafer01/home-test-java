
FROM gradle:latest AS BUILD
WORKDIR /usr/app/
COPY . .
RUN ./gradlew buildNeeded -Dselenide.headless=true -Dselenide.browser=firefox --no-daemon --parallel --console=plain --build-cache

# Package stage

FROM openjdk:11
ENV JAR_NAME=API-0.0.1-SNAPSHOT.jar
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY --from=BUILD $APP_HOME .
#ENTRYPOINT ["java","-jar", "-Dspring.profiles.active=dev -Djava.security.egd=file:/dev/./urandom","/usr/app/build/libs/AuthenticatedAPI-0.0.1-SNAPSHOT.jar"]
ENTRYPOINT exec java -jar  $APP_HOME/build/libs/$JAR_NAME