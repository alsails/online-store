const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Обрабатывается',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    goods: [],
    total_price: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    },
});

module.exports = mongoose.model('order', ordersSchema);