/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExecutionContext, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './internal/auth/auth.module';
import { UserModule } from 'src/internal/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { minutes, seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RequestIdMiddleware } from '@/internal/middlewares/RequestIdMiddleware';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'login',
          ttl: seconds(60),
          limit: 10,
          blockDuration: minutes(1),
        },
      ],
      errorMessage: 'Too many requests, please try again later.',
      storage: new ThrottlerStorageRedisService(
        `redis://${process.env.REDIS_HOSTNAME || 'localhost'}:${process.env.REDIS_PORT || 6303}`,
      ),
      getTracker: (req: Record<string, any>, context: ExecutionContext) => {
        return req.headers['x-request-id'] || context.switchToHttp().getRequest().headers['x-request-id'];
      },
      generateKey: (context: ExecutionContext, trackerString: string, throttlerName: string) => {
        return trackerString;
      },
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
