import { ApiProperty } from '@nestjs/swagger';

export class LoginUserReqDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class LoginUserResDto {
  @ApiProperty()
  token: string;
  constructor(token: string) {
    this.token = token;
  }
}
