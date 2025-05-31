import app from './app';
import { env } from './config/env';
import connectDB from './config/db';

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(env.PORT, () => {
            console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
        });

        process.on('unhandledRejection', (err: Error) => {
            console.error(`Error: ${err.message}`);
            server.close(() => process.exit(1));
        });
    } catch (error) {
        console.error(`Failed to start server: ${(error as Error).message}`);
        process.exit(1);
    }
};

startServer();
