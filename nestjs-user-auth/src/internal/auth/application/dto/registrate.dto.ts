import { ApiProperty } from '@nestjs/swagger';

export class RegistrateReqDto {
  @ApiProperty()
  verifyKey: string;
  @ApiProperty()
  verifyType: string;
  @ApiProperty()
  purpose: string;

  constructor(email: string, verifyType: string, purpose: string) {
    this.verifyKey = email;
    this.verifyType = verifyType;
    this.purpose = purpose;
  }
}

export class RegistrateResDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  message: string;

  constructor(email: string, token: string) {
    this.email = email;
    this.message = token;
  }
}
