import { ApiProperty } from '@nestjs/swagger';

export class VerifyChangePasswordReqDto {
  @ApiProperty()
  verifyKey: string;
  @ApiProperty()
  otp: string;
  constructor(verifyKey: string, otp: string) {
    this.verifyKey = verifyKey;
    this.otp = otp;
  }
}

export class VerifyChangePasswordResDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  token: string;
  constructor(message: string, success: boolean, token: string) {
    this.message = message;
    this.success = success;
    this.token = token;
  }
}
