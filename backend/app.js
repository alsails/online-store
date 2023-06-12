const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const { errors } = require('celebrate');

const { PORT = 3001 } = process.env;
const handelError = require('./error/HandleError');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const app = express();
mongoose.connect('mongodb://127.0.0.1/onlineStoreDB');
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3002',
        'http://127.0.0.1',
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'],
}));

app.use(cookieParser());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routers'));

app.use(errors());

app.use(handelError);

app.listen(PORT);