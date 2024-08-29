import { Request, Response, NextFunction } from "express";
import { BadRequestError, InternalServerError } from "../http/index";
import { Schema } from "joi";

export const bookValidator =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const { error, value } = schema.validate(body);
      if (error?.message) {
        throw new BadRequestError(error.message);
      }
      next();
    } catch (error: any) {
      throw new InternalServerError('Internal Server Error')
    }
  };
