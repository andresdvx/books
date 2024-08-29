"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = exports.NotFoundError = exports.HttpError = void 0;
class HttpError extends Error {
    constructor(errorMessage, statusCode) {
        super(errorMessage);
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpError = HttpError;
class NotFoundError extends HttpError {
    constructor(errorMessage) {
        super(errorMessage, 404);
        this.errorMessage = errorMessage;
        this.name = "Not Found Error";
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends HttpError {
    constructor(errorMessage) {
        super(errorMessage, 400);
        this.errorMessage = errorMessage;
        this.name = "Bad Request Error";
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends HttpError {
    constructor(errorMessage) {
        super(errorMessage, 500);
        this.errorMessage = errorMessage;
        this.name = "Internal Server Error";
    }
}
exports.InternalServerError = InternalServerError;
