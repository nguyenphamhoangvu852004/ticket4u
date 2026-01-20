import { LoginUserReqDto, LoginUserResDto } from '@/internal/auth/application/dto/login.dto';
import { RegistrateReqDto, RegistrateResDto } from '@/internal/auth/application/dto/registrate.dto';
import {
  UpdateRegistrateUserReqDto,
  UpdateRegistrateUserResDto,
} from '@/internal/auth/application/dto/updateRegistratePassword.dto';
import { VerifyRegistrateUserReqDto, VerifyRegistrateUserResDto } from '@/internal/auth/application/dto/verify.dto';
import { AuthHandler } from '@/internal/auth/presentation/auth.handler';
import { ResponseData } from '@/internal/global/ResponseData';
import { ApiResponseData } from '@/libs/swagger/swagger.utils';
import { Body, Controller, ExecutionContext, Get, Patch, Post, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';
import {
  GetDeviceIPAdressReqDto,
  GetDeviceIPAdressResDto,
} from '@/internal/auth/application/dto/getDeviceIPAdress.dto';
import { DeviceGuard } from '@/internal/auth/device.guard';
import { PermissionGuard } from '@/internal/auth/permission.guard';
import { LoginGuard } from '@/internal/auth/login.guard';
import { ACTORS, RESOURCES } from '@/internal/global/Metadata';
@ApiTags('Auth')
@Controller('auth')
export class AuthHttp {
  constructor(private readonly authHandler: AuthHandler) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegistrateReqDto })
  @ApiResponseData(RegistrateResDto)
  @Post('/register')
  // @Throttle({ registrate: {} })
  async registrate(
    context: ExecutionContext,
    @Req() req: Request,
    @Res() res: Response,
    @Body() reqData: RegistrateReqDto,
  ): Promise<void> {
    const responseData: ResponseData<RegistrateResDto> = await this.authHandler.registrateNewUser(context, reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @ApiBody({ type: VerifyRegistrateUserReqDto })
  @ApiResponseData(VerifyRegistrateUserResDto)
  @Post('/verify')
  @Throttle({ verifyOTP: {} })
  async verify(@Req() req: Request, @Res() res: Response, @Body() reqData: VerifyRegistrateUserReqDto): Promise<void> {
    const responseData: ResponseData<VerifyRegistrateUserResDto> =
      await this.authHandler.verifyRegistrateNewUser(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiOperation({ summary: 'Update password registrer' })
  @ApiBody({ type: UpdateRegistrateUserReqDto })
  @ApiResponseData(UpdateRegistrateUserResDto)
  @Patch('/password')
  @Throttle({ verifyOTP: {} })
  async updatePasswordRegistrate(
    @Req() req: Request,
    @Res() res: Response,
    @Body() reqData: UpdateRegistrateUserReqDto,
  ) {
    const responseData: ResponseData<UpdateRegistrateUserResDto> =
      await this.authHandler.updatePasswordRegistrateNewUser(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginUserReqDto })
  @ApiResponseData(LoginUserResDto)
  @Post('/login')
  async loginUser(@Req() req: Request, @Res() res: Response, @Body() reqData: LoginUserReqDto) {
    const responseData: ResponseData<LoginUserResDto> = await this.authHandler.login(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  // @Delete('delete')
  // @UseGuards(LoginGuard, PermissionGuard)
  // @SetMetadata('permissions', ['DELETE'])
  // @SetMetadata('actors', ['USER'])
  // @SetMetadata('resources', ['USER_PROFILE'])
  // deleteUser(@Req() req: Request, @Res() res: Response) {
  //   setTimeout(() => {}, 1000);
  //   res.status(200).json({ code: 200, message: 'User deleted successfully' });
  //   return;
  // }
  @UseGuards(LoginGuard, PermissionGuard, DeviceGuard)
  @SetMetadata('permissions', ['READ'])
  @SetMetadata('actors', ACTORS)
  @SetMetadata('resources', RESOURCES)
  @Throttle({ device: {} })
  @SkipThrottle({ registrate: true, verifyOTP: true })
  @Get('/devices')
  async getIPAddress(@Req() req: Request, @Res() res: Response) {
    const responseData: ResponseData<GetDeviceIPAdressResDto> = await this.authHandler.getDeviceIPAddress(
      new GetDeviceIPAdressReqDto(),
    );
    res.status(responseData.code).json(responseData);
    return;
  }
}
