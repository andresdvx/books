"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const index_1 = require("../../common/http/index");
class BooksService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date(book.publicationDate);
            date.setHours(24, 0, 0, 0);
            return this.prismaService.book.create({
                data: Object.assign(Object.assign({}, book), { publicationDate: date }),
            });
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.book.findMany();
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.book.findUnique({ where: { id } });
        });
    }
    updateBook(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.book
                .update({
                where: {
                    id,
                },
                data: data,
            })
                .catch((error) => {
                throw new index_1.NotFoundError(`book not found with id ${id}`);
            });
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prismaService.book.delete({ where: { id } }).catch((error) => {
                throw new index_1.NotFoundError(`book not found with id ${id}`);
            });
        });
    }
}
exports.BooksService = BooksService;
