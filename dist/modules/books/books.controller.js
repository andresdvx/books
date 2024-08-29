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
exports.BooksController = void 0;
const book_schema_1 = require("./schemas/book.schema");
const book_middleware_1 = require("../../common/middlewares/book.middleware");
const httpResponse_1 = require("../../common/http/httpResponse");
const index_1 = require("../../common/http/index");
class BooksController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    router(app) {
        app.post("/books", (0, book_middleware_1.bookValidator)(book_schema_1.bookSchema), this.createBook.bind(this));
        app.get("/books", this.getBooks.bind(this));
        app.get("/books/:id", this.getBookById.bind(this));
        app.patch("/books/:id", (0, book_middleware_1.bookValidator)(book_schema_1.bookSchema), this.updateBook.bind(this));
        app.delete("/books/:id", this.deleteBook.bind(this));
    }
    createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const book = yield this.bookService.createBook(data);
                return (0, httpResponse_1.HttpResponse)(201, "book created succesfully", res, book);
            }
            catch (error) {
                return error instanceof index_1.HttpError
                    ? res.status(error.statusCode).json(error)
                    : res.status(500).json(error);
            }
        });
    }
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookService.getBooks();
                return (0, httpResponse_1.HttpResponse)(200, "books", res, books);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    getBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield this.bookService.getBookById(id);
                return (0, httpResponse_1.HttpResponse)(200, "book", res, book);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const book = yield this.bookService.updateBook(id, data);
                return (0, httpResponse_1.HttpResponse)(200, "Book Updated", res, book);
            }
            catch (error) {
                console.log(error);
                return res.status(error.statusCode).json(error);
            }
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const book = yield this.bookService.deleteBook(id);
                return (0, httpResponse_1.HttpResponse)(200, "Book Deleted", res, book);
            }
            catch (error) {
                console.log(error);
                return error instanceof index_1.HttpError
                    ? res.status(error.statusCode).json(error)
                    : res.status(500).json(error);
            }
        });
    }
}
exports.BooksController = BooksController;
