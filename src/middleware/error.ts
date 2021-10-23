import { NextFunction, Request, Response } from "express";
import AppError from '../config/error';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let error = err;

    if (!(err instanceof AppError)) {
        error = new AppError(500, 'Something went wrong');
    }

    res.status(500).send(error);
}