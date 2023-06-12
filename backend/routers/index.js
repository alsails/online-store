const router = require('express').Router();

const NotFound = require('../error/NotFound');
const auth_user = require('../middlewares/auth_user');
const auth_staff = require('../middlewares/auth_staff');

router.use('/categories', require('./categories'));
router.use('/subcategories', require('./subcategories'));
router.use('/manufacturers', require('./manufacturers'));
router.use('/sale', require('./sale'));
router.use('/goods', require('./goods'));
router.use('/role', require('./role'));

router.use('/', require('./auth_user'));
router.use('/admin', require('./auth_staff'));

router.use('/goods', auth_user, require('./likes'));
router.use('/users', auth_user, require('./users'));
router.use('/carts', auth_user, require('./carts'));
router.use('/orders', auth_user, require('./orders'));

router.use('/admin', auth_staff, require('./staff'));

router.use(() => {
    throw new NotFound('Страница не найдена');
});
module.exports = router;