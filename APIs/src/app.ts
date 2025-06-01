import express, { Application } from 'express';
import { errorHandler } from './middleware/error.middleware';
import { passportInitialize } from './config/passport';
import 'reflect-metadata';
import routes from './modules';
import { notFoundHandler } from './middleware/notFound.middleware';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportInitialize);

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
