const router = require('express').Router();

const NotFound = require('../error/NotFound');
const auth = require('../middlewares/auth');

router.use('/categories', require('./categories'));
router.use('/subcategories', require('./subcategories'));
router.use('/manufacturers', require('./manufacturers'));
router.use('/sale', require('./sale'));
router.use('/goods', require('./goods'));

router.use('/', require('./auth'));

router.use(auth);
router.use('/goods', require('./likes'));
router.use('/users', require('./users'));
router.use('/carts', require('./carts'));
router.use('/orders', require('./orders'));

router.use(() => {
    throw new NotFound('Страница не найдена');
});
module.exports = router;