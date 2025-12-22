import { ApiProperty } from '@nestjs/swagger';

export class UpdateRegistrateUserReqDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword: string;
  constructor(token: string, password: string, confirmPassword: string) {
    this.token = token;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}

export class UpdateRegistrateUserResDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}
