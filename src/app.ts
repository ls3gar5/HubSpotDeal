import express, {json, Application} from 'express';
import morgan from 'morgan';
import '@babel/polyfill';


//importing routes
import dealRoutes from './routes/deals';
import healthcheckRoutes from './routes/healthcheck';
import conatctRoutes from './routes/conatct';
import downloadRoutes from './routes/download';

// import products from './routes/products';
// import './database/mongoDbDataBase';
//initilizations
const app: Application = express();

//midleware de express
app.use(morgan('combined'));
//interpretar los request con datos json
app.use(express.json());
app.use(express.text());


//routes
app.use('/api/health', healthcheckRoutes);
app.use('/api/deal',dealRoutes);
app.use('/api/contact',conatctRoutes);
app.use('/api/download',downloadRoutes);


//app.use('/api/products',products);

export default app;
