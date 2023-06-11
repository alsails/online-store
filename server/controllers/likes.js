const mongoose = require('mongoose');

goods = require('../models/goods');
const NotFound = require('../error/NotFound');
const BadRequest = require('../error/BadRequest');
const { CastError, ValidationError } = mongoose.Error;

module.exports.likeGood = (req, res, next) => {
    goods.findByIdAndUpdate(
        req.params.goodId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
    )
        .populate({path: 'category', populate: { path: 'category' }})
        .populate(['likes'])
        .then((good) => {
            res.send(good)
        })
        .catch(next)
};

module.exports.dislikeGood = (req, res, next) => {
    goods.findByIdAndUpdate(
        req.params.goodId,
        { $pull: { likes: req.user._id } },
        { new: true },
    )
        .populate({path: 'category', populate: { path: 'category' }})
        .populate(['likes'])
        .orFail(() => {
            throw new NotFound('Карточка с указанным _id не найдена');
        })
        .then((good) => res.send( good ))
        .catch((err) => {
            if (err.name instanceof CastError) {
                next(new BadRequest('Введен некорректный _id'));
            } else next(err);
        });
};