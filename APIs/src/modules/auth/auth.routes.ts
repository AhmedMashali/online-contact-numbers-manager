import { Router } from 'express';
import { loginUser, registerUser } from './auth.controller';
import { validateDto } from '../../middleware/validate-dto.middleware';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

const router = Router();

router.post('/register', validateDto(RegisterDto), registerUser);
router.post('/login', validateDto(LoginDto), loginUser);

export default router;
