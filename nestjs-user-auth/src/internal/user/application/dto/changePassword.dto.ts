import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangePasswordReqDto {
  @IsNotEmpty({ always: true, message: 'Please provide a user key' })
  @IsString({ always: true, message: 'User key must be a string' })
  @Length(1, 50, { always: true, message: 'User key must be between 1 and 50 characters' })
  @ApiProperty()
  verifyKey: string;

  @ApiProperty()
  @IsNotEmpty({ always: true, message: 'Please provide your old password' })
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty({ always: true, message: 'Please provide your new password' })
  verifyType: string;

  @ApiProperty()
  @IsNotEmpty({ always: true, message: 'Please provide the purpose of the password change' })
  purpose: string;

  constructor(userKey: string, oldPassword: string, verifyType: string, purpose: string) {
    this.verifyKey = userKey;
    this.oldPassword = oldPassword;
    this.verifyType = verifyType;
    this.purpose = purpose;
  }
}

export class ChangePasswordResDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}

export class ConfirmChangePasswordReqDto {
  @ApiProperty()
  @IsString({ always: true, message: 'Must be a string' })
  token: string;

  @ApiProperty()
  @IsNotEmpty({ always: true, message: 'Please provide your new password' })
  @IsString({ always: true, message: 'Must be a string' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ always: true, message: 'Please provide your confirm password' })
  @IsString({ always: true, message: 'Must be a string' })
  confirmPassword: string;
  constructor(token: string, password: string, confirmPassword: string) {
    this.token = token;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
export class ConfirmChangePasswordResDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}
