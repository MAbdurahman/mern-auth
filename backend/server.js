//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDatabase from './config/configDatabase.js';
import Template from './template.js';

import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_ENV || '/api/v1.0/';

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})
//**************** connect to database ****************//
connectDatabase();

//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
   app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

//**************** app listening ****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
const server = app.listen(PORT, () => {
   console.log(`The server is listening at - http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode🔥`.yellow);
});

} else {
   console.log(`The server is listening at port - ${PORT}`)
}

//**************** routes****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
   app.get('/api/v1.0/', (req, res) => {
      res.send(Template());
   });
}
app.use('/api/v1.0/user', userRoutes);
app.use('/api/v1.0/auth', authRoutes);

//**************** handle errors middleware ****************//
app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   return res.status(statusCode).json({
      success: false, statusCode, message,
   });
});