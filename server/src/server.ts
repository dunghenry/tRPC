import * as trpcExpress from '@trpc/server/adapters/express';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import helmet from 'helmet';
import morgan from 'morgan';
import { createContext, appRouter } from './app';
const app: Application = express();
const port: number | string = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);
//method get<Params, ResBody, ReqBody, ReqQuery, Locals>
app.get<{}, { message: string }, {}, {}>('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to server!!',
    });
});
app.listen(port, () => {
    console.log('Server listening on http://localhost:%d', port);
});
