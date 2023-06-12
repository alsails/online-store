const router = require('express').Router();

const {addAnGoodToTheCart, getCarts, changeQuantity, delCart} = require('../controllers/carts')

router.post('/', addAnGoodToTheCart);
router.get('/', getCarts);
router.patch('/quantity', changeQuantity);
router.delete('/:cartId', delCart);

module.exports = router;