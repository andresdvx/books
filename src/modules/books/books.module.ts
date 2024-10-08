import { Application } from "express";
import { PrismaService } from "../../common/prisma/prisma.service";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";

export class BooksModule {
  private readonly prismaService: PrismaService;
  private readonly booksService: BooksService;
  private readonly booksController: BooksController;

  constructor() {
    this.prismaService = new PrismaService();
    this.booksService = new BooksService(this.prismaService);
    this.booksController = new BooksController(this.booksService);
  }

  public configure(app: Application) {
    this.prismaService.connect();
    this.booksController.router(app);
  }
}
