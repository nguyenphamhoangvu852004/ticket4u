/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApiResponseData } from '@/libs/swagger/swagger.utils';
import { LoginGuard } from '@/internal/auth/login.guard';
import { Body, Controller, Get, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { Request, Response } from 'express';
import { ResponseData } from 'src/internal/global/ResponseData';
import {
  GetUserInfoReqDto,
  GetUserInfoResDto,
  UserGetListReqDto,
  UserGetListResDto,
} from 'src/internal/user/application/dto/get.dto';
import { UserHandler } from 'src/internal/user/presentation/user.handler';
import {
  ChangePasswordReqDto,
  ChangePasswordResDto,
  ConfirmChangePasswordReqDto,
  ConfirmChangePasswordResDto,
} from '@/internal/user/application/dto/changePassword.dto';
import {
  VerifyChangePasswordReqDto,
  VerifyChangePasswordResDto,
} from '@/internal/user/application/dto/verifyChangePassword.dto';
import { UpdateUserProfileReqDto, UpdateUserProfileResDto } from '@/internal/user/application/dto/update.dto';

@ApiTags('Users')
@Controller('users')
export class UserHttp {
  constructor(private readonly userHandler: UserHandler) {}

  @ApiOperation({ summary: 'Get list users avalable' })
  @ApiResponseData(UserGetListResDto)
  @ApiQuery({
    required: false,
    name: 'page',
    type: String,
  })
  @Get('')
  async getListUsersAvalable(@Req() req: Request, @Res() res: Response, @Query() reqData: UserGetListReqDto) {
    const responseData: ResponseData<UserGetListResDto> = await this.userHandler.getListUsersAvalable(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponseData(GetUserInfoResDto)
  @UseGuards(LoginGuard)
  @Get('/profiles')
  async getUserById(@Req() req: Request, @Res() res: Response) {
    const user = req['user'];
    log('User info from token:', user);

    const responseData: ResponseData<GetUserInfoResDto> = await this.userHandler.getUserInfo(
      new GetUserInfoReqDto(user.email),
    );
    res.status(responseData.code).json(responseData);
    return;
  }

  // @ApiOperation({ summary: 'Create new user' })
  // @ApiBody({ type: CreateUserReqDto })
  // @ApiResponseData(CreateUserResDto)
  // @Post('')
  // async createUser(@Req() req: Request, @Res() res: Response, @Body() reqData: CreateUserReqDto) {
  //   const responseData: ResponseData<CreateUserResDto> = await this.userHandler.createUser(reqData);
  //   res.status(responseData.code).json(responseData);
  //   return;
  // }

  // @Post('profiles')
  // async createUserProfile(@Req() req: Request, @Res() res: Response, @Body() reqData: CreateProfileReqDto) {
  //   const responseData: ResponseData<CreateProfileResDto> = await this.userHandler.createUserProfile(reqData);
  //   res.status(responseData.code).json(responseData);
  //   return;
  // }

  @ApiOperation({ summary: 'Change password (Send OTP to user)' })
  @ApiBearerAuth()
  @UseGuards(LoginGuard)
  @ApiResponseData(ChangePasswordResDto)
  @Post('password/otp')
  async changePassword(@Req() req: Request, @Res() res: Response, @Body() reqData: ChangePasswordReqDto) {
    const responseData: ResponseData<ChangePasswordResDto> = await this.userHandler.changePassword(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiOperation({ summary: 'Verify change password (verify OTP)' })
  @ApiBearerAuth()
  @ApiResponseData(VerifyChangePasswordResDto)
  @UseGuards(LoginGuard)
  @Post('password/verify-otp')
  async verifyChange(@Req() req: Request, @Res() res: Response, @Body() reqData: VerifyChangePasswordReqDto) {
    const responseData: ResponseData<VerifyChangePasswordResDto> = await this.userHandler.verifyChangePassword(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiOperation({ summary: 'Confirm change password' })
  @ApiBearerAuth()
  @ApiResponseData(ConfirmChangePasswordResDto)
  @UseGuards(LoginGuard)
  @Patch('password/confirm')
  async confirmChangePassword(@Req() req: Request, @Res() res: Response, @Body() reqData: ConfirmChangePasswordReqDto) {
    const responseData: ResponseData<ConfirmChangePasswordResDto> =
      await this.userHandler.confirmChangePassword(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiBearerAuth()
  @ApiResponseData(UpdateUserProfileResDto)
  @UseGuards(LoginGuard)
  @Patch('/profiles')
  async updateProfile(@Req() req: Request, @Res() res: Response, @Body() reqData: UpdateUserProfileReqDto) {
    const requestUser = req['user'];
    console.log('🚀 ~ UserHttp ~ updateProfile ~ requestUser:', requestUser);

    reqData.userId = requestUser.id;
    reqData.avatar = req.body.avatar;
    reqData.birthday = req.body.birthday;
    reqData.gender = req.body.gender;
    reqData.mobile = req.body.mobile;
    reqData.nickname = req.body.nickname;
    reqData.state = req.body.state;

    console.log('🚀 ~ UserHttp ~ updateProfile ~ reqData:', reqData);
    const responseData: ResponseData<UpdateUserProfileResDto> = await this.userHandler.updateUserProfile(reqData);
    res.status(responseData.code).json(responseData);
    return;
  }
}
