import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';
import './models/User';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRoutes from './routes/authRoutes';
import requireAuth from './middlewares/requireAuth';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', requireAuth, usersRouter);
app.use(authRoutes);

mongoose.connect('mongodb://localhost/life-navigator-dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('connected', () => {
  console.log('Database connected');
});

export default app;
