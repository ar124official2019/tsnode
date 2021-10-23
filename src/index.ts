import * as dotenv from 'dotenv';
dotenv.config({
    path: path.join(root, '.env')
});

import express from 'express';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/auth';
import path from 'path';
import root from './root';

import connection from './config/mongoose';
import DashboardRouter from './routes/dashboard';
import errorHandler from './middleware/error';
connection.then(() => {
    console.log('Connected to database!');
}).catch(err => {
    console.error(err);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.set('view engine', 'pug');
app.set('views', path.join(root, 'views'));
app.set('port', 3000);

app.use('/auth', AuthRouter);
app.use('/dashboard', DashboardRouter);
app.use('*', errorHandler);

app.listen(3000, '', () => {
    console.log("Listening");
});
