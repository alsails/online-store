const router = require('express').Router();

const {createGoods, getGoods, likeGood, dislikeGood} = require('../controllers/goods')

router.post('/', createGoods);
router.get('/', getGoods);
router.put('/:goodId/likes', likeGood);
router.delete('/:goodId/likes', dislikeGood);

module.exports = router;