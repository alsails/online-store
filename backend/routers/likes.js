const router = require('express').Router();

const {likeGood, dislikeGood} = require('../controllers/likes')

router.put('/:goodId/likes', likeGood);
router.delete('/:goodId/likes', dislikeGood);

module.exports = router;