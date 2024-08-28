import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../http/index";
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
      return res.status(error.statusCode).json(error);
    }
  };
