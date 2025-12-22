/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AuthServiceInterface } from '@/internal/auth/application/auth.service.interface';
import {
  GetDeviceIPAdressReqDto,
  GetDeviceIPAdressResDto,
} from '@/internal/auth/application/dto/getDeviceIPAdress.dto';
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
@Injectable()
export class AuthHandler {
  constructor(@Inject('AuthService') private readonly authService: AuthServiceInterface) {}

  async getDeviceIPAddress(reqData: GetDeviceIPAdressReqDto): Promise<ResponseData<GetDeviceIPAdressResDto>> {
    try {
      const data = await this.authService.getDeviceIPAddress(reqData);
      return ResponseData.success(data);
    } catch (error) {
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as GetDeviceIPAdressResDto,
      );
    }
  }

  async login(reqData: LoginUserReqDto): Promise<ResponseData<LoginUserResDto>> {
    try {
      return ResponseData.success(await this.authService.login(loginAccount.parse(reqData)));
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
      return ResponseData.success(await this.authService.registrate(reqData));
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
      return ResponseData.success(await this.authService.verify(reqData));
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
      return ResponseData.success(await this.authService.updatePassword(reqData));
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
}
