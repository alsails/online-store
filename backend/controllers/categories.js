const category = require('../models/categories');

module.exports.getCategories = (req, res, next) => {
    category.find()
        .then((categories) => res.send(categories))
        .catch(next);
};