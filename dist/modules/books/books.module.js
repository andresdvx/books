"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksModule = void 0;
const prisma_service_1 = require("../../common/prisma/prisma.service");
const books_service_1 = require("./books.service");
const books_controller_1 = require("./books.controller");
class BooksModule {
    constructor() {
        this.prismaService = new prisma_service_1.PrismaService();
        this.booksService = new books_service_1.BooksService(this.prismaService);
        this.booksController = new books_controller_1.BooksController(this.booksService);
    }
    configure(app) {
        this.prismaService
            .connect()
            .then(() => {
            console.log("Connected to the database");
        })
            .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
        this.booksController.router(app);
    }
}
exports.BooksModule = BooksModule;
