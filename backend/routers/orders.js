const router = require('express').Router();

const {getOrders, addOrders} = require('../controllers/orders')

router.get('/', getOrders);
router.post('/', addOrders);

module.exports = router;