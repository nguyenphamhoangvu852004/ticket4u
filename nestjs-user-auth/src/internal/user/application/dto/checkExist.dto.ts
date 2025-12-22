export class CheckExistUserReqDto {
  constructor(private userId: string) {}
  getUserId(): string {
    return this.userId;
  }
}

export class CheckExistUserResDto {
  constructor(private isExist: boolean) {}
}
