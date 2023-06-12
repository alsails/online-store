const manufacturers = require('../models/manufacturers');

module.exports.getManufacturers = (req, res, next) => {
    manufacturers.find()
        .then((manufacturers) => res.send({manufacturers}))
        .catch(next);
};