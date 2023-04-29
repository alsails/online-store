const router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/subcategories', require('./subcategories'));
router.use('/goods', require('./goods'));
router.use('/manufacturers', require('./manufacturers'));

module.exports = router;