"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const HttpResponse = (statusCode, message, res, data) => {
    res.status(statusCode).json({
        statusCode: statusCode,
        message: message,
        data: data,
    });
};
exports.HttpResponse = HttpResponse;
