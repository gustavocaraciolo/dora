web: java $JAVA_OPTS -Xmx1024m -jar target/*.war --spring.profiles.active=prod,heroku,no-liquibase --server.port=$PORT
release: cp -R src/main/resources/config config && ./mvnw liquibase:update -Pheroku
