const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    good: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'good',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

module.exports = mongoose.model('cart', ordersSchema);