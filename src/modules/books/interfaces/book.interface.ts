import { Book } from "@prisma/client";

export interface IBook {
  createBook:   (book: Book) => Promise<Book>;
  getBooks:     () => Promise<Book[]>;
  getBookById:  (id: string) => Promise<Book | null>;
  updateBook:   (id: string, data: Partial<Book>) => Promise<Book | null>;
  deleteBook:   (id : string) => Promise<Book | null>;
}
