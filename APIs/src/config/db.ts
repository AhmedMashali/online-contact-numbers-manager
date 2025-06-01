import mongoose from 'mongoose';
import { env } from './env';

const connectDB = async (): Promise<void> => {
    try {
        if (!env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined');
        }

        await mongoose.connect(env.MONGODB_URI);
        console.log(`Database is connected successfully`);
    } catch (error) {
        console.error(`Database connection error: ${(error as Error).message}`);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

export default connectDB;
