import { PrismaService } from "../../common/prisma/prisma.service";
import { IBook } from "./interfaces/book.interface";
import { NotFoundError } from "../../common/http/index";
import { booksData } from "../../common/data/books.data";
import { Book } from "@prisma/client";

export class BooksService implements IBook {
  constructor(private readonly prismaService: PrismaService) {}

  async createBook(book: Book): Promise<Book> {
    return this.prismaService.book.create({
      data: book,
    });
  }

  async getBooks(): Promise<Book[]> {
    return this.prismaService.book.findMany();
  }

  async getBookById(id: string): Promise<Book | null> {
    const book = await this.prismaService.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundError(`book not found with id ${id}`);
    return book;
  }

  async updateBook(id: string, data: Partial<Book>): Promise<Book | null> {
    const bookFound = await this.getBookById(id);
    const book = await this.prismaService.book.update({
      where: {
        id,
      },
      data: data,
    });
    return book;
  }

  async deleteBook(id: string): Promise<Book | null> {
    const bookFound = await this.getBookById(id);
    const book = await this.prismaService.book.delete({ where: { id } });
    return book;
  }

  async testData() {
    return this.prismaService.book.createMany({
      data: booksData,
    });
  }

  async deleteData() {
    return this.prismaService.book.deleteMany({});
  }
}
