const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const BadRequest = require('../error/BadRequest');
const Conflict = require('../error/Conflict');

module.exports.createUser = (req, res, next) => {
    const { email, password } = req.body;
    bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ email, password: hash }))
        .then((user) => {
            const userInfo = user.toObject();
            delete userInfo.password;
            res.send({
                data: userInfo,
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

    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign(
                { _id: user._id },
                'some-secret-key',
                { expiresIn: '7d' });
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
                httpOnly: true,
            });
            const userInfo = user.toObject();
            delete userInfo.password;
            res.send({
                data: userInfo,
            });
        })
        .catch(next);
};