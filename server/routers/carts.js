const router = require('express').Router();

const {addAnGoodToTheCart, getCarts} = require('../controllers/carts')

router.post('/', addAnGoodToTheCart);
router.get('/', getCarts);

module.exports = router;