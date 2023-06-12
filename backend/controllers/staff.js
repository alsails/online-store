const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Staff = require('../models/staff');
const BadRequest = require('../error/BadRequest');
const Conflict = require('../error/Conflict');
const mongoose = require("mongoose");
const NotFound = require("../error/NotFound");

const { CastError, ValidationError } = mongoose.Error;

module.exports.createUser = (req, res, next) => {
    const { login, password, role } = req.body;
    bcrypt
        .hash(password, 10)
        .then((hash) => Staff.create({ login, password: hash, role }))
        .then((staff) => {
            const staffInfo = staff.toObject();
            delete staffInfo.password;
            res.send({
                staffInfo
            });
        })
        .catch((err) => {
            if (err.code === 11000) {
                next(new Conflict('Введеный login уже зарегистрирован'));
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
    const { login, password } = req.body;

    Staff.findStaffByCredentials(login, password)

        .then((staff) => {
            const token = jwt.sign({ _id: staff._id }, 'some-secret-key', { expiresIn: '7d' });
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 7),
                httpOnly: true,
            });
            const staffInfo = staff.toObject();
            delete staffInfo.password;

            res.send(req.cookies);
        })
        .catch(next);
};

function findStaffById(id) {
    return Staff.findById(id)
        .orFail(() => {
            throw new NotFound('Пользователь с указанным _id не найден');
        });
}

module.exports.getStaff = (req, res, next) => {
    findStaffById(req.staff._id)
        .then((staff) => {
            staff
                .populate(['role'])
                .then(() => res.send(staff))
        })
        .catch(err => console.log(err));
};
