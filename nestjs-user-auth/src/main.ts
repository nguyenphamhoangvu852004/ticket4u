/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MysqlDatasource } from '@/datasource/mysql.datasource';
import { NodeMailerImplementation } from '@/libs/nodemailer/nodemailer';
import { RedisDatasource } from '@/datasource/redis.datasource';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { startEurekaClient, stopEurekaClient } from '@/libs/eureka-client/eurekaClient';
import { logInfo } from '@/libs/winston/logger';
import { RequestLoggingInterceptor } from '@/internal/intercepters/RequestLoggingInterceptor';
import { GlobalExceptionFilter } from '@/internal/intercepters/GlobalExeptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/2025');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new RequestLoggingInterceptor());
  MysqlDatasource.getInstance().connect();
  NodeMailerImplementation.getInstance();
  RedisDatasource.getInstance().connect();

  const documentFactory = () =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Ticket4u - User Auth Service')
        .setDescription('User Authentication Service for Ticket4U Application')
        .setVersion('1.0.0')
        .addTag('Ticket4u')
        .addBearerAuth()
        .build(),
    );

  startEurekaClient();

  SwaggerModule.setup('api/docs', app, documentFactory());

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
