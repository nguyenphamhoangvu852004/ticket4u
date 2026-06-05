import { GetUserPermissionsByUserIdUseCase } from '@/internal/auth/application/GetUserPermissionsByUserIdUseCase';
import { AuthRepositoryImplementation } from '@/internal/auth/infrastructure/repositoryImpl/auth.repository.implementation';
import { AuthHttp } from '@/internal/auth/presentation/auth.http';
import { UserRepositoryImplementation } from '@/internal/user/infrastructure/repositoryImpl/user.repository.implementation';
import { Module } from '@nestjs/common';
import { OAuthHttp } from './presentation/oauth.http';
import { UserLoginUseCase } from './application/UserLoginUseCase';
import { AuthHandler } from './presentation/auth.handler';
import { RequestRegistrationOtpUseCase } from './application/RequestRegistrationOtpUseCase';
import { VerifyRegistrationOtpUseCase } from './application/VerifyRegistrationOtpUseCase';
import { FinalizeRegistrationUseCase } from './application/FinalizeRegistrationUseCase';
import { RefreshTokenUseCase } from './application/RefreshTokenUseCase';
@Module({
  imports: [],
  controllers: [AuthHttp, OAuthHttp],
  providers: [
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImplementation,
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImplementation,
    },
    UserLoginUseCase,
    RequestRegistrationOtpUseCase,
    VerifyRegistrationOtpUseCase,
    FinalizeRegistrationUseCase,
    RefreshTokenUseCase,
    GetUserPermissionsByUserIdUseCase,
    AuthHandler,
  ],
  exports: [GetUserPermissionsByUserIdUseCase],
})
export class AuthModule {}
