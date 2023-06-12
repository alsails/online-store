const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    good_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'good',
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('sale', saleSchema);