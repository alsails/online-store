const goods = require('../models/goods');
const NotFound = require('../error/NotFound');
const BadRequest = require('../error/BadRequest');


module.exports.createGoods = (req, res, next) => {
    const {name, subcategory, img, description, manufacturers, quantity, price} = req.body;
    goods.create({name, category: subcategory, img, description, manufacturer: manufacturers, quantity, price})
        .then((goods) => res.send(goods))
        .catch((err) => next(err));
};

module.exports.getGoods = (req, res, next) => {
    goods.find()
        .populate({path: 'category', populate: { path: 'category' }})
        .populate(['manufacturer'])
        .then((goods) => {
            res.send(goods)
        })
        .catch(next);
};

module.exports.likeGood = (req, res, next) => {
    goods.findByIdAndUpdate(
        req.params.goodId,
        { $addToSet: { likes: req.user._id } },
        { new: true },
    )
        .populate({path: 'category', populate: { path: 'category' }})
        .orFail(() => {
            throw new NotFound('Карточка с указанным _id не найдена');
        })
        .then((good) => {
            console.log(req.user._id)
            res.send(good)
        })
        .catch((err) => {
            if (err.name instanceof CastError) {
                next(new BadRequest('Введен некорректный _id'));
            } else next(err);
        });
};

module.exports.dislikeGood = (req, res, next) => {
    goods.findByIdAndUpdate(
        req.params.goodId,
        { $pull: { likes: req.user._id } },
        { new: true },
    )
        .populate({path: 'category', populate: { path: 'category' }})
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