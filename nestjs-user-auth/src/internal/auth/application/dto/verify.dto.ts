import { ApiProperty } from '@nestjs/swagger';

export class VerifyRegistrateUserReqDto {
  @ApiProperty()
  otp: string;
  @ApiProperty()
  verifyKey: string;

  constructor(otp: string, verifyKey: string) {
    this.otp = otp;
    this.verifyKey = verifyKey;
  }
}

export class VerifyRegistrateUserResDto {
  @ApiProperty()
  verifyKey: string;
  @ApiProperty()
  token: string;
  @ApiProperty()
  message: string;

  constructor(verifyKey: string, message: string, token: string) {
    this.verifyKey = verifyKey;
    this.message = message;
    this.token = token;
  }
}
