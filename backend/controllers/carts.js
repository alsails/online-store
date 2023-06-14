const mongoose = require('mongoose');
const carts = require('../models/carts');
const NotFound = require('../error/NotFound');
const BadRequest = require('../error/BadRequest');
const { ValidationError } = mongoose.Error;

module.exports.addAnGoodToTheCart = (req, res, next) => {
    const {good} = req.body;
    carts.create({good, user: req.user._id})
        .then((cart) => {
            cart.populate(['user', 'good'])
                .then(() => res.send(cart))
        })
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

module.exports.changeQuantity = (req, res, next) => {
    const cartId = req.body._id;
    console.log(req.body);
    const { quantity } = req.body;
    return carts.findByIdAndUpdate( cartId, {quantity})
        .orFail(() => {
            throw new NotFound('Строка с указанным _id не найден');
        })
        .then((carts) => res.send( carts ))
        .catch((err) => {
            if (err.name instanceof ValidationError) {
                const errorMessage = Object.values(err.errors)
                    .map((error) => error.message)
                    .join('; ');
                next(new BadRequest(errorMessage));
            } else next(err);
        });
};

module.exports.delCart = (req, res, next) => {
    console.log(req.params.cartId)
    carts.findById(req.params.cartId)
        .orFail(() => {
            throw new NotFound('Строка с указанным _id не найдена');
        })
        .then((card) => {
            card.deleteOne()
                .then(() => {
                    res.send(card);
                })
                .catch(next);

        })
        .catch((err) => next(err));
};
