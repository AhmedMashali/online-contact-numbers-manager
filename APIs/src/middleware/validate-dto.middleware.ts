import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse';

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!req.body || Object.keys(req.body).length === 0) {
            errorResponse(res, 'Request body is required', 400);
            return;
        }

        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            const messages = errors
                .flatMap((error) => (error.constraints ? Object.values(error.constraints) : []))
                .join(', ');

            errorResponse(res, messages, 400);
            return;
        }

        req.body = dtoObject;
        next();
    };
}
