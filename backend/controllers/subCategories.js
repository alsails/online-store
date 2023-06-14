const subcategories = require('../models/subcategories');

module.exports.createSubCategories = (req, res, next) => {
    const {categories, subcategory} = req.body;

    subcategories.create({ category: categories, subcategory })
        .then((subcategory) => res.send({ subcategory }))
        .catch((err) => next(err));
};

module.exports.getSubCategories = (req, res, next) => {
    subcategories.find()
        .populate(['category'])
        .then((subcategory) => res.send(subcategory))
        .catch(next);
};