const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    surname: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },
    middle_name: {
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    phone_number: {
        type: String,
        minlength: 11,
        maxlength: 11,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // select: false,
    },
});

module.exports = mongoose.model('user', userSchema);
