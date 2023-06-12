const mongoose = require('mongoose');

role = require('../models/role');

module.exports.createRole = (req, res, next) => {
    const {name} = req.body;
    role.create({name})
        .then((role) => res.send(role))
        .catch((err) => next(err));
};