"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.bookSchema = joi_1.default.object({
    isbn: joi_1.default.string().min(5),
    title: joi_1.default.string().min(1),
    author: joi_1.default.string().min(1),
    genre: joi_1.default.string().min(1),
    publicationDate: joi_1.default.date(),
});
