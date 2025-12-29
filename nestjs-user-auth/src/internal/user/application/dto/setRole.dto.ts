import { ApiProperty } from '@nestjs/swagger';

export class SetRoleToUserReqDto {
  @ApiProperty()
  public account: string;
  @ApiProperty()
  public roleIds: number[];
  constructor(account: string, roleIds: number[]) {
    this.account = account;
    this.roleIds = roleIds;
  }
}

export class SetRoleToUserResDto {
  @ApiProperty()
  public success: boolean;
  constructor(success: boolean) {
    this.success = success;
  }
}
