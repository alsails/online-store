const goods = require('../models/goods');

module.exports.createGoods = (req, res, next) => {
    const {name, subcategory, img, description, manufacturers, quantity, price} = req.body;
    goods.create({name, category: subcategory, img, description, manufacturer: manufacturers, quantity, price})
        .then((goods) => res.send(goods))
        .catch((err) => next(err));
};

module.exports.getGoods = (req, res, next) => {
    goods.find()
        .populate(['category', 'manufacturer'])
        .then((goods) => {
            res.send(goods)
        })
        .catch(next);
};