"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidator = void 0;
const index_1 = require("../http/index");
const bookValidator = (schema) => (req, res, next) => {
    try {
        const body = req.body;
        const { error, value } = schema.validate(body);
        if (error === null || error === void 0 ? void 0 : error.message) {
            throw new index_1.BadRequestError(error.message);
        }
        next();
    }
    catch (error) {
        throw new index_1.InternalServerError('Internal Server Error');
    }
};
exports.bookValidator = bookValidator;
