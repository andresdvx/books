import { PrismaService } from "../../common/prisma/prisma.service";
import { IBook } from "./interfaces/book.interface";
import { NotFoundError, InternalServerError } from "../../common/http/index";
import { Book } from "@prisma/client";

export class BooksService implements IBook {
  constructor(private readonly prismaService: PrismaService) {}

  async createBook(book: Book): Promise<Book> {
    const date = new Date(book.publicationDate);
    date.setHours(24, 0, 0, 0);
    return this.prismaService.book.create({
      data: { ...book, publicationDate: date },
    });
  }

  async getBooks(): Promise<Book[]> {
    return this.prismaService.book.findMany();
  }

  async getBookById(id: string): Promise<Book | null> {
    return this.prismaService.book.findUnique({ where: { id } });
  }

  async updateBook(id: string, data: Partial<Book>): Promise<Book | null> {
    return this.prismaService.book
      .update({
        where: {
          id,
        },
        data: data,
      })
      .catch((error) => {
        throw new NotFoundError(`book not found with id ${id}`);
      });
  }

  async deleteBook(id: string): Promise<Book | null> {
    return this.prismaService.book.delete({ where: { id } }).catch((error) => {
      throw new NotFoundError(`book not found with id ${id}`);
    });
  }
}
