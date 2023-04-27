const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subcategory: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('subcategory', subcategorySchema);