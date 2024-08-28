
export class HttpError extends Error {
  constructor(public errorMessage: string, public statusCode: number) {
    super(errorMessage);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


export class NotFoundError extends HttpError {
  constructor(public errorMessage: string) {
    super(errorMessage, 404);
    this.name = "Not Found Error";
  }
}

export class BadRequestError extends HttpError {
  constructor(public errorMessage: string) {
    super(errorMessage, 400);
    this.name = "Bad Request Error";
  }
}

export class InternalServerError extends HttpError {
  constructor(public errorMessage: string) {
    super(errorMessage, 500);
    this.name = "Internal Server Error";
  }
}
