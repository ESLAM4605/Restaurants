import { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
export const catchError = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};

export class AppError extends Error {
  status: any;
  constructor(message: string, status: any) {
    super(message);
    this.status = status;
  }
}
