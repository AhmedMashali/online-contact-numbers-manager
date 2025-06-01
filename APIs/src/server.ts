// server.ts
import app from './app';
import connectDB from './config/db';
import { env } from './config/env';

const runServer = async () => {
    try {
        console.log(`${env.NODE_ENV} mode`);
        await connectDB();

        const server = app.listen(env.PORT, () => {
            console.log(`Server running on port ${env.PORT}`);
        });

        const shutdown = (signal: string) => {
            console.log(`${signal} received. Shutting down gracefully...`);
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);

        process.on('unhandledRejection', (err: Error) => {
            console.error(`Unhandled Rejection: ${err.message}`);
            shutdown('UnhandledRejection');
        });

        process.on('uncaughtException', (err: Error) => {
            console.error(`Uncaught Exception: ${err.message}`);
            process.exit(1);
        });
    } catch (err: any) {
        console.error(`Startup error: ${err.message}`);
        process.exit(1);
    }
};

runServer();
