const router = require('express').Router();

const {createGoods, getGoods} = require('../controllers/goods')

router.post('/', createGoods);
router.get('/', getGoods);

module.exports = router;