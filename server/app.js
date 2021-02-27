import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import goalRoutes from './routes/goalRoutes';
import sessionRoutes from './routes/sessionRoutes';
import requireAuth from './middlewares/requireAuth';

dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(authRoutes);
app.use(requireAuth, goalRoutes);
app.use(requireAuth, sessionRoutes);

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
