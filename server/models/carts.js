const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    good: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'good',
        required: true
    },
    quantity: {
        type: Number,
        def: 1,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

module.exports = mongoose.model('cart', ordersSchema);