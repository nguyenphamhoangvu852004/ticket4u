import { AuthRepositoryImplementation } from '@/internal/auth/infrastructure/repositoryImpl/auth.repository.implementation';
import { Module } from '@nestjs/common';
import { UserServiceImpl } from 'src/internal/user/application/user.service.implementation';
import { UserRepositoryImplementation } from 'src/internal/user/infrastructure/repositoryImpl/user.repository.implementation';
import { UserHandler } from 'src/internal/user/presentation/user.handler';
import { UserHttp } from 'src/internal/user/presentation/user.http';

@Module({
  imports: [],
  controllers: [UserHttp],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImplementation,
    },
    {
      provide: 'UserService',
      useClass: UserServiceImpl,
    },
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImplementation,
    },
    UserHandler,
  ],
  exports: ['UserService'],
})
export class UserModule {}
