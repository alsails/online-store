const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
    good_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'good',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
});

module.exports = mongoose.model('favourites', favouritesSchema);