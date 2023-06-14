const orders = require('../models/orders');
const User = require("../models/users");

module.exports.getOrders = (req, res, next) => {
    orders.find()
        .populate(['user'])
        .then((order) => {
            res.send(order)
        })
        .catch(next);
};

module.exports.addOrders = (req, res, next) => {
    const {order_number, date, address, goods, total_price, comment} = req.body.good
    orders.create({order_number, date, address, user: req.user._id, goods, total_price, comment})
        .then((order) => {
            order.populate(['user'])
                .then(() => res.send(order))
        })
        .catch(next);
};

module.exports.changeOrders = (req, res, next) => {
    const OrderId = req.body._id
    const status = req.body.status
    orders.findByIdAndUpdate(OrderId, {status: status}, {new: true})
        .then((order) => {
            order.populate(['user'])
                .then(() => {
                    res.send(order)
                })
        })
        .catch(err => console.log(err));
};

