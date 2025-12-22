import { ApiProperty } from '@nestjs/swagger';

export class ResponseData<T> {
  @ApiProperty()
  code: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  data: T | T[];

  constructor(code: number, message: string, data: T | T[]) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T | T[]): ResponseData<T> {
    return new ResponseData(HttpStatus.OK, HttpMessage.OK, data);
  }

  static error<T>(code: HttpStatus, message: string, data: T | T[]): ResponseData<T> {
    return new ResponseData(code, message, data);
  }
}

export enum HttpStatus {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  CONFLIC = 409,
}

export enum HttpMessage {
  OK = 'Ok',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  NOT_FOUND = 'Not Found',
  CONFLIC = 'Conflict',
}

// const HttpStatusMessageMap: Record<HttpStatus, HttpMessage> = {
//   [HttpStatus.OK]: HttpMessage.OK,
//   [HttpStatus.BAD_REQUEST]: HttpMessage.BAD_REQUEST,
//   [HttpStatus.INTERNAL_SERVER_ERROR]: HttpMessage.INTERNAL_SERVER_ERROR,
//   [HttpStatus.NOT_FOUND]: HttpMessage.NOT_FOUND,
//   [HttpStatus.CONFLIC]: HttpMessage.CONFLIC,
// };
