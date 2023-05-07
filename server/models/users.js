const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NotAuthenticated = require('../error/NotAuthenticated');

const userSchema = new mongoose.Schema({
    surname: {
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 30,
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
        select: false,
    },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
    return this.findOne({ email }).select('+password')
        .then((user) => {
            if (!user) {
                throw new NotAuthenticated('Введена неверная почта или пароль');
            }

            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        throw new NotAuthenticated('Введена неверная почта или пароль');
                    }

                    return user;
                });
        });
};

module.exports = mongoose.model('user', userSchema);
