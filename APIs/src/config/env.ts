import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || '';

export const env = {
    PORT,
    NODE_ENV,
    MONGODB_URI,
    isProduction: NODE_ENV === 'production',
    isDevelopment: NODE_ENV === 'development',
};
