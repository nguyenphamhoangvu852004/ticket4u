import { AuthServiceImplementation } from '@/internal/auth/application/auth.service.implementation';
import { AuthRepositoryImplementation } from '@/internal/auth/infrastructure/repositoryImpl/auth.repository.implementation';
import { AuthHandler } from '@/internal/auth/presentation/auth.handler';
import { AuthHttp } from '@/internal/auth/presentation/auth.http';
import { UserRepositoryImplementation } from '@/internal/user/infrastructure/repositoryImpl/user.repository.implementation';
import { Module } from '@nestjs/common';
@Module({
  imports: [],
  controllers: [AuthHttp],
  providers: [
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImplementation,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImplementation,
    },
    {
      provide: 'AuthService',
      useClass: AuthServiceImplementation,
    },
    AuthServiceImplementation,
    AuthHandler,
  ],
  exports: ['AuthService'],
})
export class AuthModule {}
