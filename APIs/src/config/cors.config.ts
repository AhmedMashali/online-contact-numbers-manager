import cors from 'cors';
import { env } from './env';

const corsOptions: cors.CorsOptions = {
    origin: env.ORIGINS,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
};

export default corsOptions;
