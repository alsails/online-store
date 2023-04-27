const mongoose = require('mongoose');

const contentOfOrdersSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: true
    },
    good_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'good',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

module.exports = mongoose.model('contentOfOrder', contentOfOrdersSchema);