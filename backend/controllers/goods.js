const mongoose = require('mongoose');

goods = require('../models/goods');
const NotFound = require('../error/NotFound');
const BadRequest = require('../error/BadRequest');
const { CastError, ValidationError } = mongoose.Error;

module.exports.createGoods = (req, res, next) => {
    const {name, subcategory, img, description, manufacturers, quantity, price} = req.body;
    goods.create({name, category: subcategory, img, description, manufacturer: manufacturers, quantity, price})
        .then((goods) => res.send(goods))
        .catch((err) => next(err));
};

module.exports.getGoods = (req, res, next) => {
    goods.find()
        .populate({path: 'category', populate: { path: 'category' }})
        .populate(['manufacturer', 'likes'])
        .then((goods) => {
            res.send(goods)
        })
        .catch(next);
};

