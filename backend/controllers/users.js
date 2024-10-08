const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const BadRequest = require('../error/BadRequest');
const Conflict = require('../error/Conflict');
const mongoose = require("mongoose");
const NotFound = require("../error/NotFound");

const { CastError, ValidationError } = mongoose.Error;

module.exports.createUser = (req, res, next) => {
    const { email, password, date } = req.body;
    bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ email, password: hash, date }))
        .then((user) => {
            const userInfo = user.toObject();
            delete userInfo.password;
            res.send({
                userInfo
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                next(new Conflict('Введеный email уже зарегистрирован'));
                return;
            }
            if (err.name instanceof ValidationError) {
                const errorMessage = Object.values(err.errors)
                    .map((error) => error.message)
                    .join('; ');
                next(new BadRequest(errorMessage));
            } else next(err);
        });
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findUserByCredentials(email, password)

        .then((user) => {
            const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
                httpOnly: true,
            });
            const userInfo = user.toObject();
            delete userInfo.password;

            res.send(req.cookies);
        })
        .catch(next);
};

function findUserById(id) {
    return User.findById(id)
        .orFail(() => {
            throw new NotFound('Пользователь с указанным _id не найден');
        });
}

module.exports.getUsers = (req, res, next) => {
    User.find()
        .then((user) => {
            res.send(user)
        })
        .catch(next);
};

module.exports.getUser = (req, res, next) => {
    findUserById(req.user._id)
        .then((user) => {
            res.send(user)
        })
        .catch(err => console.log(err));
};

module.exports.updateUserInfo = (req, res, next) => {
    const {name, phone_number} = req.body;
    User.findByIdAndUpdate(req.user._id, {name, phone_number}, {new: true})
        .then((user) => {
            res.send(user)
        })
        .catch(err => console.log(err));
};
