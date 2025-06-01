import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    errorResponse(res, 'Endpoint not found', 404);
};
