/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MysqlDatasource } from '@/datasource/mysql.datasource';
import { NodeMailerImplementation } from '@/libs/nodemailer/nodemailer';
import { RedisDatasource } from '@/datasource/redis.datasource';
import { ValidationPipe } from '@nestjs/common';
import { startEurekaClient, stopEurekaClient } from '@/libs/eureka-client/eurekaClient';
import { logInfo } from '@/libs/winston/logger';
import { RequestLoggingInterceptor } from '@/internal/intercepters/RequestLoggingInterceptor';
import { GlobalExceptionFilter } from '@/internal/intercepters/GlobalExeptionFilter';
import SwaggerConfig from '@/libs/swagger/swagger.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1/2025');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new RequestLoggingInterceptor());

  // MySQL
  MysqlDatasource.getInstance().connect();
  // Redis
  RedisDatasource.getInstance().connect();
  // Swagger
  SwaggerConfig.getInstance(app).setup();
  // Mailer
  NodeMailerImplementation.getInstance();

  startEurekaClient();

  // Khi app chuẩn bị tắt
  process.on('SIGINT', async () => {
    // console.log('\n🛑 App shutting down...');
    logInfo('App shutting down...');
    await RedisDatasource.getInstance().disconnect();
    await MysqlDatasource.getInstance().disconnect();
    stopEurekaClient();
    process.exit(0);
  });

  await app.listen(process.env.APP_PORT || 3000);
  console.log(`🚀 Server is running on port ${process.env.APP_PORT || 3000}`);
}
bootstrap();
