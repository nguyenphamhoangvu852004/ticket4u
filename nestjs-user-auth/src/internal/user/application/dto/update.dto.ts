import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileReqDto {
  userId: string;
  @ApiProperty()
  nickname?: string;
  @ApiProperty()
  avatar?: string;
  @ApiProperty()
  state?: string;
  @ApiProperty()
  mobile?: string;
  @ApiProperty()
  gender?: string;
  @ApiProperty()
  birthday?: string;
  constructor(partial?: Partial<UpdateUserProfileReqDto>) {
    Object.assign(this, partial);
  }
}

export class UpdateUserProfileResDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}
