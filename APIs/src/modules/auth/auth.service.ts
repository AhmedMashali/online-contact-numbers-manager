import jwt, { SignOptions } from 'jsonwebtoken';
import { AuthResponse, UserPayload } from './auth.types';
import { env } from '../../config/env.config';
import { User } from '../users/user.model';
import * as userService from '../users/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export const register = async (registerDto: RegisterDto): Promise<AuthResponse> => {
    try {
        const { username, password } = registerDto;
        const newUser = await userService.createUser({ username, password });
        const token = generateToken({
            _id: newUser._id,
            username: newUser.username,
        });
        return {
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
            },
        };
    } catch (error) {
        throw error;
    }
};

export const login = async (loginDto: LoginDto): Promise<AuthResponse> => {
    try {
        const user = await User.findOne({ username: loginDto.username }).select('+password');
        if (!user) throw new Error('Invalid credentials');

        const isMatch = await user.comparePassword(loginDto.password);
        if (!isMatch) throw new Error('Invalid credentials');

        const token = generateToken({
            _id: user._id,
            username: user.username,
        });

        return {
            token,
            user: {
                _id: user._id,
                username: user.username,
            },
        };
    } catch (error) {
        throw error;
    }
};

const generateToken = (payload: UserPayload): string => {
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRE,
    };

    return jwt.sign(payload, env.JWT_SECRET as jwt.Secret, options);
};
