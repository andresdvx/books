import { Application } from "express";
import { BooksModule } from "./modules/books/books.module";

export class AppModule {
  private modules = [new BooksModule()];

  constructor() {}

  configure(app: Application) {
    for (let module of this.modules) {
      module.configure(app);
    }
  }
}
