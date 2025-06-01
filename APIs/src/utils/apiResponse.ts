import { Response } from 'express';

export const successResponse = (
    res: Response,
    data: any,
    message: string = 'Success',
    statusCode: number = 200
) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (
    res: Response,
    message: string = 'Error occurred',
    statusCode: number = 500
) => {
    res.status(statusCode || 500).json({
        success: false,
        message: message || 'Error occurred',
    });
};
