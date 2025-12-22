import { ApiProperty } from '@nestjs/swagger';

export class UserGetListReqDto {
  page?: string;
  constructor(page?: string) {
    this.page = page;
  }
}
export class UserGetListResDto {
  @ApiProperty()
  listUser: GetUserInfoResDto[];
  constructor(listUser: GetUserInfoResDto[]) {
    this.listUser = listUser;
  }
}

export class GetUserInfoReqDto {
  @ApiProperty()
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

export class ProfileResDto {
  @ApiProperty()
  account: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  birthday: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  modifiedAt: string;
  constructor(
    account: string,
    nickname: string,
    avatar: string,
    state: string,
    mobile: string,
    gender: string,
    birthday: string,
    email: string,
    createdAt: string,
    modifiedAt: string,
  ) {
    this.account = account;
    this.nickname = nickname;
    this.avatar = avatar;
    this.state = state;
    this.mobile = mobile;
    this.gender = gender;
    this.birthday = birthday;
    this.email = email;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
  }
}

export class GetUserInfoResDto {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  loginTime: number;
  @ApiProperty()
  loginIp: string;
  @ApiProperty()
  roles?: string[];
  @ApiProperty()
  permissions?: string[];
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  modifiedAt: string;
  @ApiProperty()
  profile: ProfileResDto;

  constructor(
    userId: string,
    username: string,
    loginTime: number,
    loginIp: string,
    createdAt: string,
    modifiedAt: string,
    profile: ProfileResDto,
    roles?: string[],
    permissions?: string[],
  ) {
    this.userId = userId;
    this.username = username;
    this.loginTime = loginTime;
    this.loginIp = loginIp;
    this.roles = roles;
    this.permissions = permissions;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.profile = profile;
  }
}
