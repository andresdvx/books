import { Application, Request, Response } from "express";
import { BooksService } from "./books.service";
import { bookSchema } from "../../common/schemas/book.schema";
import { bookValidator } from "../../common/middlewares/book.middleware";
import { Book } from "@prisma/client";

export class BooksController {
  constructor(private bookService: BooksService) {}

  router(app: Application) {
    app.post("/books", bookValidator(bookSchema), this.createBook.bind(this));
    app.get("/books", this.getBooks.bind(this));
    app.get("/books/:id", this.getBookById.bind(this));
    app.patch("/books/:id", this.updateBook.bind(this));
    app.delete("/books/:id", this.deleteBook.bind(this));
  }

  async createBook(req: Request, res: Response) {
    try {
      const data: Book = req.body;
      const book = await this.bookService.createBook(data);
      return res.status(201).json(book);
    } catch (error : any) {
      console.log(error.message);
      return res.status(error.statusCode).json(error);
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const books = await this.bookService.getBooks();
      return res.status(200).json(books);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBookById(id);
      return res.status(200).json(book);
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
      return res.status(200).json(book);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const book = await this.bookService.deleteBook(id);
      return res.status(200).json(book);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }
}
