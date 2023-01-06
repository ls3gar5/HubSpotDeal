import express, {json, Application, NextFunction} from 'express';
import morgan from 'morgan';
import '@babel/polyfill';
import ErrorHandler from '../src/error/error-handler';

//importing routes
import dealRoutes from './routes/deals';
import healthcheckRoutes from './routes/healthcheck';
import conatctRoutes from './routes/conatct';
import downloadRoutes from './routes/download';
import BaseError from './error/BaseError';
import { listeners } from 'process';
import errorHandler from '../src/error/error-handler';

// import products from './routes/products';
// import './database/mongoDbDataBase';
//initilizations
const app: Application = express();

//midleware de express
app.use(morgan('combined'));

// app.use(errorMiddleware);

//interpretar los request con datos json
app.use(express.json());
app.use(express.text());



//routes
app.use('/api/health', healthcheckRoutes);
app.use('/api/deal',dealRoutes);
app.use('/api/contact',conatctRoutes);
app.use('/api/download',downloadRoutes);


process.on('uncaughtException', async (error: Error | any): Promise<void> => {
    console.log(`Unhandled Exception: ${error.message || error}`);
    await ErrorHandler.handleError(error);
    if (!ErrorHandler.isTrustedError(error)) process.exit(1);
});

process.on('unhandledRejection', async ( reason: any, promise: Promise<any>): Promise<void> => {
    console.log(`Unhandled Rejection: ${reason.message || reason}, ${promise}`);
    await ErrorHandler.handleError(reason);
    console.log(!ErrorHandler.isTrustedError(reason));
    if (!ErrorHandler.isTrustedError(reason)) process.exit(1);
});

// async function errorMiddleware(err: BaseError, req: Request, res: Response, next: NextFunction){
//     if(!ErrorHandler.isTrustedError(err)){
//         next(err);
//         return;
//     }

//     await ErrorHandler.handleError(err);
// }

export default app;
