import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';
import { AppError } from '../utils/AppError';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    let { message, statusCode } = err;

    if (!err.statusCode) {
        message = 'Internal server error';
        statusCode = 500;
        console.error(err.stack);
    }

    errorResponse(res, message, statusCode);
};
