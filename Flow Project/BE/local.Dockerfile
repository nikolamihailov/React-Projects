FROM maven:3.9.6-eclipse-temurin-21 as build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src/ /app/src/
RUN mvn package

FROM eclipse-temurin:21.0.2_13-jre
COPY --from=build /app/target/*.jar /app.jar
CMD ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]