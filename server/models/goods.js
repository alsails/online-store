const mongoose = require('mongoose');

const goodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'manufacturer',
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
    likes:  [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: [],
    }],
});

module.exports = mongoose.model('good', goodSchema);