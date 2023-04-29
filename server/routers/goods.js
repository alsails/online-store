const router = require('express').Router();

const {createGoods, getGoods} = require('../controllers/goods')

router.post('/', createGoods);
router.get('/:goodsId', getGoods);

module.exports = router;