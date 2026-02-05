# Etapa 1: Compilación de la aplicación
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo pom.xml y descargamos las dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiamos el código fuente
COPY src ./src

# Compilamos la aplicación y generamos el JAR
RUN mvn clean package -DskipTests

# Etapa 2: Imagen de ejecución ligera
FROM eclipse-temurin:21-jre-alpine

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el JAR compilado desde la etapa anterior
COPY --from=build /app/target/thymeleaf-0.0.1-SNAPSHOT.jar app.jar

# Exponemos el puerto de la aplicación Spring Boot
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]