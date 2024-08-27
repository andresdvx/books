import { HttpError } from "./httpError";

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
