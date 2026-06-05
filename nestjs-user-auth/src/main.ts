import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MySQLDatasource } from '@/datasource/mysql.datasource';
import { RedisDatasource } from './datasource/redis.datasource';

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
  // SwaggerConfig.getInstance(app).setup();
  // Mailer
  // NodeMailerImplementation.getInstance();

  // startEurekaClient();

  // // Khi app chuẩn bị tắt
  // process.on('SIGINT', async () => {
  //   // console.log('\n🛑 App shutting down...');
  //   logInfo('App shutting down...');
  //   await RedisDatasource.getInstance().disconnect();
  //   await MysqlDatasource.getInstance().disconnect();
  //   stopEurekaClient();
  //   process.exit(0);
  // });

  await app.listen(process.env.APP_PORT || 8087);
  console.log(`🚀 Server is running on port ${process.env.APP_PORT || 8087}`);
}
bootstrap();
