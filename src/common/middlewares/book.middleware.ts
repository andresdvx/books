import { Request, Response, NextFunction } from "express";
import { BadRequestError, InternalServerError } from "../http/index";
import { Schema } from "joi";
import { Book } from "@prisma/client";

export const bookValidator =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const body : Partial<Book> = req.body;
      if(!body || Object.keys(body).length === 0) throw new BadRequestError('body request cannot be empty');
      
      const { error, value } = schema.validate(body);
      if (error?.message) {
        throw new BadRequestError(error.message);
      }
      next();
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  };
