import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './models/User'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import authRoutes from './routes/authRoutes'
import mongoose from 'mongoose'

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use(authRoutes)

mongoose.connect('mongodb://localhost/life-navigator-dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.on('connected', () => {
  console.log('Database connected')
})

export default app
