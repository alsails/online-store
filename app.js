const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');

const { PORT = 3001 } = process.env;
const handelError = require('./server/error/HandleError');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const app = express();

mongoose.connect('mongodb://127.0.0.1/onlineStoreDB');

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./server/routers/index'));

app.use(errors());

app.use(handelError);

app.listen(PORT);