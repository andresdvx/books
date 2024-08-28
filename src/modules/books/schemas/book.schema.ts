import joi from "joi";

export const bookSchema = joi.object({
  isbn: joi.string().min(5),
  title: joi.string().min(1),
  author: joi.string().min(1),
  genre: joi.string().min(1),
  publicationDate: joi.date(),
});
