const sale = require('../models/sales');

module.exports.createSale = (req, res, next) => {
    const {good, new_price} = req.body;
    sale.create({good_name: good, new_price})
        .then((sale) => res.send({sale}))
        .catch(next);
};

module.exports.getSale = (req, res, next) => {
    sale.find()
        .populate('good_name')
        .then((goods) => {
            res.send(goods)
        })
        .catch(next);
};