import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/auth/auth.module';
import { UserModule } from 'src/internal/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RequestIdMiddleware } from '@/internal/middlewares/RequestIdMiddleware';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'registrate',
          ttl: seconds(5),
          limit: 2,
        },
        {
          name: 'verifyOTP',
          ttl: seconds(5),
          limit: 1,
        },
      ],
      errorMessage: 'Too many requests, please try again later.',
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'container' ? '.env.container' : '.env.dev',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
