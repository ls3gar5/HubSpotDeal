import express, {json} from 'express';
import morgan from 'morgan';
import '@babel/polyfill';


//importing routes
// import projectRoutes from './routes/projects';
// import taskRoutes from './routes/tasks';
// import baseRoutes from './routes/bases';
// import products from './routes/products';
// import './database/mongoDbDataBase';
//initilizations
const app = express();

//midleware de express
app.use(morgan('combined'));
//interpretar los request con datos json
app.use(json());

//routes
// app.use('/api', baseRoutes);
// app.use('/api/projects',projectRoutes);
// app.use('/api/tasks',taskRoutes);


//app.use('/api/products',products);

export default app;
