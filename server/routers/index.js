const router = require('express').Router();

const NotFound = require('../error/NotFound');
const auth = require('../middlewares/auth');

router.use('/categories', require('./categories'));
router.use('/subcategories', require('./subcategories'));
router.use('/goods', require('./goods'));
router.use('/manufacturers', require('./manufacturers'));
router.use('/sale', require('./sale'));

router.use('/', require('./auth'));

router.use(auth);
router.use('/users', require('./users'));

router.use(() => {
    throw new NotFound('Страница не найдена');
});
module.exports = router;