export class HttpError extends Error {
  constructor(public errorMessage: string, public statusCode: number) {
    super(errorMessage);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
