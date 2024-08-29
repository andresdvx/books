"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const books_module_1 = require("./modules/books/books.module");
class AppModule {
    constructor() {
        this.modules = [new books_module_1.BooksModule()];
    }
    configure(app) {
        for (let module of this.modules) {
            module.configure(app);
        }
    }
}
exports.AppModule = AppModule;
