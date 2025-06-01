import express, { Application } from 'express';
import 'reflect-metadata';
import cors from 'cors';

import { errorHandler } from './middleware/error.middleware';
import { passportInitialize } from './config/passport.config';
import routes from './modules';
import { notFoundHandler } from './middleware/notFound.middleware';
import corsOptions from './config/cors.config';

const app: Application = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passportInitialize);

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
