FROM openjdk:11
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY . .
RUN mvn package
CMD ["java", "-jar", "target/demohib2-0.0.1-SNAPSHOT.jar"]
