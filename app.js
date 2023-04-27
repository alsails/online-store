const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

const app = express();

mongoose
    .connect('mongodb://127.0.0.1/onlineStoreDB');

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./server/routers/index'));

app.listen(PORT);