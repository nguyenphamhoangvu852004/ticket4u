export class SoftDeleteUserReqDto {
  constructor(private userId: string) {}
  getUserId(): string {
    return this.userId;
  }
}

export class SoftDeleteUserResDto {
  constructor(private isDeleted: boolean) {}
}
