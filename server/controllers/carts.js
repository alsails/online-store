const mongoose = require('mongoose');

carts = require('../models/carts');

module.exports.addAnGoodToTheCart = (req, res, next) => {
    const {good, quantity, user} = req.body;
    carts.create({good, quantity, user: req.user._id})
        .then((carts) => res.send(carts))
        .catch((err) => next(err));
};

module.exports.getCarts = (req, res, next) => {
    carts.find()
        .populate(['user', 'good'])
        .then((carts) => {
            res.send(carts)
        })
        .catch(next);
};