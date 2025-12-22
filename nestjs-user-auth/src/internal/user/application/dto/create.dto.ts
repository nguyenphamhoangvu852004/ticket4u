export class CreateUserReqDto {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string) {
    this._password = password;
    this._username = username;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }
}
export class CreateUserResDto {
  private _userId: string;
  private _username: string;

  constructor(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
  }
  public get userId(): string {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }

  public get username(): string {
    return this._username;
  }
  public set username(value: string) {
    this._username = value;
  }
}
