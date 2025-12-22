export class GetUserProfileReqDto {
  userKey: string;
  constructor(userKey: string) {
    this.userKey = userKey;
  }
}
export class GetUserProfileResDto {
  userKey: string;
  account: string;
  nickname: string;
  avatar: string;
  state: string;
  mobile: string;
  gender: string;
  birthday: string;
  email: string;
  isAuthenticated: number;

  constructor(
    userKey: string,
    account: string,
    nickname: string,
    avatar: string,
    state: string,
    mobile: string,
    gender: string,
    birthday: string,
    email: string,
    isAuthenticated: number,
  ) {
    this.userKey = userKey;
    this.account = account;
    this.nickname = nickname;
    this.avatar = avatar;
    this.state = state;
    this.mobile = mobile;
    this.gender = gender;
    this.birthday = birthday;
    this.email = email;
    this.isAuthenticated = isAuthenticated;
  }
}

export class GetUserBaseReqDto {
  userId: string;
  constructor(userId: string) {
    this.userId = userId;
  }
}

export class PermissionResDto {
  id: string;
  name: string;
  resource: string;
  constructor(id: string, name: string, resource: string) {
    this.id = id;
    this.name = name;
    this.resource = resource;
  }
}
export class RoleResDto {
  id: string;
  name: string;
  permissions: PermissionResDto[];
  constructor(id: string, name: string, permissions: PermissionResDto[]) {
    this.id = id;
    this.name = name;
    this.permissions = permissions;
  }
}

export class GetUserBaseResDto {
  id: string;
  account: string;
  password: string;
  salt: number;
  loginTime: number;
  logoutTime: number;
  loginIp: string;
  roles: RoleResDto[];
  creatorId: string;
  modifierId: string;
  deletorId: string;
  createdAt: number;
  modifiedAt: number;
  deletedAt: number;

  constructor(
    id: string,
    account: string,
    password: string,
    salt: number,
    loginTime: number,
    logoutTime: number,
    loginIp: string,
    roles: RoleResDto[],
    creatorId: string,
    modifierId: string,
    deletorId: string,
    createdAt: number,
    modifiedAt: number,
    deletedAt: number,
  ) {
    this.id = id;
    this.account = account;
    this.password = password;
    this.salt = salt;
    this.loginTime = loginTime;
    this.logoutTime = logoutTime;
    this.loginIp = loginIp;
    this.creatorId = creatorId;
    this.modifierId = modifierId;
    this.deletorId = deletorId;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.deletedAt = deletedAt;
    this.roles = roles;
  }
}
