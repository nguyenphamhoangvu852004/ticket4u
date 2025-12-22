export class CreateProfileReqDto {
  account: string;
  nickname: string;
  avatar: string;
  state: string;
  mobile: string;
  gender: string;
  birthday: string;
  email: string;
  constructor(
    account: string,
    nickname: string,
    avatar: string,
    state: string,
    mobile: string,
    gender: string,
    birthday: string,
    email: string,
  ) {
    this.account = account;
    this.nickname = nickname;
    this.avatar = avatar;
    this.state = state;
    this.mobile = mobile;
    this.gender = gender;
    this.birthday = birthday;
    this.email = email;
  }
}

export class CreateProfileResDto {
  id: string;
  email: string;
  nickname: string;
  constructor(id: string, email: string, nickname: string) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
  }
}
