import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MySQLDatasource } from '@/datasource/mysql.datasource';
import { RedisDatasource } from './datasource/redis.datasource';
import SwaggerConfig from './libs/swagger/swagger.config';
import { NodeMailerImplementation } from './libs/nodemailer/nodemailer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(cookieParser());
  app.setGlobalPrefix('api/v1/2025');
  // MySQL

  // Start background DB connection retry
  await MySQLDatasource.getInstance().connectDatabaseWithRetry();
  // Redis
  await RedisDatasource.getInstance().connectWithRetry();
  // Swagger
  SwaggerConfig.getInstance(app).setup();
  // Mailer
  NodeMailerImplementation.getInstance();

  await app.listen(process.env.APP_PORT || 8087);
  console.log(`🚀 Server is running on port ${process.env.APP_PORT || 8087}`);
}
bootstrap();
