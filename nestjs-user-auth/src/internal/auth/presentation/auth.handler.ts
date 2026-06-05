/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { LoginUserReqDto, LoginUserResDto } from '@/internal/auth/application/dto/login.dto';
import { RegistrateReqDto, RegistrateResDto } from '@/internal/auth/application/dto/registrate.dto';
import {
  UpdateRegistrateUserReqDto,
  UpdateRegistrateUserResDto,
} from '@/internal/auth/application/dto/updateRegistratePassword.dto';
import { VerifyRegistrateUserReqDto, VerifyRegistrateUserResDto } from '@/internal/auth/application/dto/verify.dto';
import {
  loginAccount,
  registerNewAccount,
  updatePasswordRegistrateNewAccout,
  verifyRegistrateNewAccount,
} from '@/internal/auth/presentation/validations';
import { ResponseData } from '@/internal/global/ResponseData';
import { ErrorCustom } from '@/utils/ErrorCustom';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { log } from 'console';
import * as zod from 'zod';
import { UserLoginUseCase } from '../application/UserLoginUseCase';
import { RequestRegistrationOtpUseCase } from '../application/RequestRegistrationOtpUseCase';
import { VerifyRegistrationOtpUseCase } from '../application/VerifyRegistrationOtpUseCase';
import { FinalizeRegistrationUseCase } from '../application/FinalizeRegistrationUseCase';
import { RefreshTokenUseCase } from '../application/RefreshTokenUseCase';
import { GetUserPermissionsByUserIdUseCase } from '../application/GetUserPermissionsByUserIdUseCase';
@Injectable()
export class AuthHandler {
  constructor(
    @Inject(UserLoginUseCase) private readonly userLoginUserCase: UserLoginUseCase,
    @Inject(RequestRegistrationOtpUseCase)
    private readonly requestRegistrationOtpUseCase: RequestRegistrationOtpUseCase,
    @Inject(VerifyRegistrationOtpUseCase)
    private readonly verifyRegistrationOtpUseCase: VerifyRegistrationOtpUseCase,
    @Inject(FinalizeRegistrationUseCase)
    private readonly finalizeRegistrationUseCase: FinalizeRegistrationUseCase,
    @Inject(RefreshTokenUseCase)
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    @Inject(GetUserPermissionsByUserIdUseCase)
    private readonly getUserPermissionsByUserId: GetUserPermissionsByUserIdUseCase,
  ) {}

  async loginHandler(reqData: LoginUserReqDto): Promise<ResponseData<LoginUserResDto>> {
    try {
      return ResponseData.success(await this.userLoginUserCase.execute(loginAccount.parse(reqData)));
    } catch (error) {
      throw error;
    }
  }

  async registrateNewUser(
    context: ExecutionContext,
    reqData: RegistrateReqDto,
  ): Promise<ResponseData<RegistrateResDto>> {
    try {
      const data = registerNewAccount.parse(reqData);
      log(data);
      return ResponseData.success(await this.requestRegistrationOtpUseCase.execute(reqData));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return ResponseData.error(400, error.issues[0].message, null as unknown as RegistrateResDto);
      }
      return ResponseData.error((error as ErrorCustom).statusCode, error.message, null as unknown as RegistrateResDto);
    }
  }

  async verifyRegistrateNewUser(
    reqData: VerifyRegistrateUserReqDto,
  ): Promise<ResponseData<VerifyRegistrateUserResDto>> {
    try {
      const data = verifyRegistrateNewAccount.parse(reqData);
      log(data);
      return ResponseData.success(await this.verifyRegistrationOtpUseCase.execute(reqData));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return ResponseData.error(400, error.issues[0].message, null as unknown as VerifyRegistrateUserResDto);
      }
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as VerifyRegistrateUserResDto,
      );
    }
  }
  async updatePasswordRegistrateNewUser(
    reqData: UpdateRegistrateUserReqDto,
  ): Promise<ResponseData<UpdateRegistrateUserResDto>> {
    try {
      const data = updatePasswordRegistrateNewAccout.parse(reqData);
      log(data);
      return ResponseData.success(await this.finalizeRegistrationUseCase.execute(reqData));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return ResponseData.error(400, error.issues[0].message, null as unknown as UpdateRegistrateUserResDto);
      }
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as UpdateRegistrateUserResDto,
      );
    }
  }

  async refresh(refreshToken: string): Promise<ResponseData<LoginUserResDto>> {
    try {
      return ResponseData.success(await this.refreshTokenUseCase.execute(refreshToken));
    } catch (error) {
      if (error instanceof ErrorCustom) {
        return ResponseData.error(error.statusCode, error.message, null as unknown as LoginUserResDto);
      }
      throw error;
    }
  }
}
