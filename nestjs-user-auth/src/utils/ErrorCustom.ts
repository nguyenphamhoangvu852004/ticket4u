export class ErrorCustom extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    // bắt buộc khi extend Error trong TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BadRequestError extends ErrorCustom {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class NotFoundError extends ErrorCustom {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class InternalServerError extends ErrorCustom {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

export class DatabaseError extends ErrorCustom {
  constructor(message = 'Database Error') {
    super(503, message);
  }
}
