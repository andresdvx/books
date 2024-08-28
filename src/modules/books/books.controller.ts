import { Application, Request, Response } from "express";
import { BooksService } from "./books.service";
import { bookSchema } from "./schemas/book.schema";
import { bookValidator } from "../../common/middlewares/book.middleware";
import { Book } from "@prisma/client";
import { HttpResponse } from "../../common/http/httpResponse";
import { HttpError } from "../../common/http/index";

export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  router(app: Application) {
    app.post("/books", bookValidator(bookSchema), this.createBook.bind(this));
    app.get("/books", this.getBooks.bind(this));
    app.get("/books/:id", this.getBookById.bind(this));
    app.patch(
      "/books/:id",
      bookValidator(bookSchema),
      this.updateBook.bind(this)
    );
    app.delete("/books/:id", this.deleteBook.bind(this));
  }

  async createBook(req: Request, res: Response) {
    try {
      const data: Book = req.body;
      const book = await this.bookService.createBook(data);
      return HttpResponse(201, "book created succesfully", res, book);
    } catch (error: any) {
      return error instanceof HttpError
        ? res.status(error.statusCode).json(error)
        : res.status(500).json(error);
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const books = await this.bookService.getBooks();
      return HttpResponse(200, "books", res, books);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBookById(id);
      return HttpResponse(200, "book", res, book);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const book = await this.bookService.updateBook(id, data);
      return HttpResponse(200, "Book Updated", res, book);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await this.bookService.deleteBook(id);
      return HttpResponse(200, "Book Deleted", res, book);
    } catch (error: any) {
      console.log(error);
      return error instanceof HttpError
        ? res.status(error.statusCode).json(error)
        : res.status(500).json(error);
    }
  }
}
