import { Response } from "express";

export const HttpResponse = (statusCode: number, message: string,res: Response, data?: any) : void => {

  res.status(statusCode).json({
    statusCode: statusCode,
    message: message,
    data: data,
  });

}
