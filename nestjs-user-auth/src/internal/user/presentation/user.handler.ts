/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { updatePasswordRegistrateNewAccout } from '@/internal/auth/presentation/validations';
import {
  ChangePasswordReqDto,
  ChangePasswordResDto,
  ConfirmChangePasswordReqDto,
  ConfirmChangePasswordResDto,
} from '@/internal/user/application/dto/changePassword.dto';
import { CreateUserReqDto, CreateUserResDto } from '@/internal/user/application/dto/create.dto';
import { CreateProfileReqDto, CreateProfileResDto } from '@/internal/user/application/dto/createProfile.dto';
import { UpdateUserProfileReqDto, UpdateUserProfileResDto } from '@/internal/user/application/dto/update.dto';
import {
  VerifyChangePasswordReqDto,
  VerifyChangePasswordResDto,
} from '@/internal/user/application/dto/verifyChangePassword.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ResponseData } from 'src/internal/global/ResponseData';
import * as zod from 'zod';
import {
  GetUserInfoReqDto,
  GetUserInfoResDto,
  UserGetListReqDto,
  UserGetListResDto,
} from 'src/internal/user/application/dto/get.dto';
import { UserServiceInterface } from 'src/internal/user/application/user.service.interface';
import { ErrorCustom } from 'src/utils/ErrorCustom';
import { confirmChangePasswordReqDto, verifyChangePasswordReqDto } from '@/internal/user/presentation/validation';

@Injectable()
export class UserHandler {
  constructor(@Inject('UserService') private readonly userService: UserServiceInterface) {}

  async updateUserProfile(reqData: UpdateUserProfileReqDto): Promise<ResponseData<UpdateUserProfileResDto>> {
    try {
      const data = updatePasswordRegistrateNewAccout.parse(reqData);
      console.log('🚀 ~ UserHandler ~ updateUserProfile ~ data:', data);
      return ResponseData.success(await this.userService.updateUserProfile(reqData));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return ResponseData.error(400, error.issues[0].message, null as unknown as UpdateUserProfileResDto);
      }
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as UpdateUserProfileResDto,
      );
    }
  }

  async confirmChangePassword(
    reqData: ConfirmChangePasswordReqDto,
  ): Promise<ResponseData<ConfirmChangePasswordResDto>> {
    try {
      const data = confirmChangePasswordReqDto.parse(reqData);
      console.log('🚀 ~ UserHandler ~ confirmChangePassword ~ data:', data);
      return ResponseData.success(await this.userService.confirmChangePassword(reqData));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return ResponseData.error(400, error.issues[0].message, null as unknown as ConfirmChangePasswordResDto);
      }
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as ConfirmChangePasswordResDto,
      );
    }
  }
  async verifyChangePassword(reqData: VerifyChangePasswordReqDto): Promise<ResponseData<VerifyChangePasswordResDto>> {
    try {
      const data = verifyChangePasswordReqDto.parse(reqData);
      console.log('🚀 ~ UserHandler ~ verifyChangePassword ~ data:', data);
      return ResponseData.success(await this.userService.verifyChangePassword(reqData));
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return ResponseData.error(400, error.issues[0].message, null as unknown as VerifyChangePasswordResDto);
      }
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as VerifyChangePasswordResDto,
      );
    }
  }

  async changePassword(reqData: ChangePasswordReqDto): Promise<ResponseData<ChangePasswordResDto>> {
    try {
      return ResponseData.success(await this.userService.changePassword(reqData));
    } catch (error) {
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as ChangePasswordResDto,
      );
    }
  }

  async createUser(reqData: CreateUserReqDto): Promise<ResponseData<CreateUserResDto>> {
    try {
      const data = await this.userService.createUser(reqData);
      return ResponseData.success(data);
    } catch (error) {
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as CreateUserResDto,
      );
    }
  }
  async getListUsersAvalable(reqData: UserGetListReqDto): Promise<ResponseData<UserGetListResDto>> {
    try {
      const data = await this.userService.getListUsersAvalable(reqData);
      return ResponseData.success(data);
    } catch (error) {
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as UserGetListResDto,
      );
    }
  }

  async getUserInfo(reqData: GetUserInfoReqDto): Promise<ResponseData<GetUserInfoResDto>> {
    try {
      const data = await this.userService.getUserInfo(reqData);
      return ResponseData.success(data);
    } catch (error) {
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as GetUserInfoResDto,
      );
    }
  }

  async createUserProfile(reqData: CreateProfileReqDto): Promise<ResponseData<CreateProfileResDto>> {
    try {
      const data = await this.userService.createProfile(reqData);
      return ResponseData.success(data);
    } catch (error) {
      return ResponseData.error(
        (error as ErrorCustom).statusCode,
        error.message as string,
        null as unknown as CreateProfileResDto,
      );
    }
  }
}
