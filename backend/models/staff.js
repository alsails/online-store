const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NotAuthenticated = require('../error/NotAuthenticated');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
    },
});

staffSchema.statics.findStaffByCredentials = function findUser(login, password) {
    return this.findOne({ login }).select('+password')
        .then((user) => {
            if (!user) {
                throw new NotAuthenticated('Введен неверный логин или пароль');
            }

            return bcrypt.compare(password, user.password)
                .then((matched) => {
                    if (!matched) {
                        throw new NotAuthenticated('Введен неверный логин или пароль');
                    }

                    return user;
                });
        });
};

module.exports = mongoose.model('staff', staffSchema);
