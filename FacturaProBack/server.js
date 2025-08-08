const express = require("express");
const path = require("path");
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require("mongoose");

const { searchAvailableBooks } = require('./services/book');

const app = express();

app.use(cors({
  origin: "https://factura-pro-byxm.vercel.app",
  credentials: true
}));
app.options('*', cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require('./models/user');
require('./models/invoice');

// Routers
const userRouter = require('./routers/userRouter');
const statsRouter = require('./routers/statsRouter');
const invoiceRouter = require('./routers/invoiceRouter');
const authRouter = require('./routers/authRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/stats', statsRouter);
app.use('/invoice', invoiceRouter);

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// ✅ Export app instead of running server
module.exports = app;
