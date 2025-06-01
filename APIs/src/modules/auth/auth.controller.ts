import { NextFunction, Request, Response } from 'express';
import * as authService from './auth.service';
import { successResponse, errorResponse } from '../../utils/apiResponse';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

export const registerUser = async (
    req: Request<{}, {}, RegisterDto>,
    res: Response,
    next: NextFunction
) => {
    try {
        const authResponse = await authService.register(req.body);
        successResponse(res, authResponse, 'User registered successfully', 201);
    } catch (error: any) {
        next(error);
    }
};

export const loginUser = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    try {
        const authResponse = await authService.login(req.body);
        successResponse(res, authResponse, 'Login successful');
    } catch (error: any) {
        errorResponse(res, error.message, 401);
    }
};
