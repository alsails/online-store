const orders = require('../models/orders');

module.exports.getOrders = (req, res, next) => {
    orders.find()
        .populate(['user'])
        .then((order) => {
            res.send(order)
        })
        .catch(next);
};

module.exports.addOrders = (req, res, next) => {
    const {order_number, date, address, goods, total_price} = req.body.good
    orders.create({order_number, date, address, user: req.user._id, goods, total_price})
        .then((order) => {
            order.populate(['user'])
                .then(() => res.send(order))
        })
        .catch(next);
};