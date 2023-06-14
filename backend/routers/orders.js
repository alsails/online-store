const router = require('express').Router();

const {getOrders, addOrders, changeOrders} = require('../controllers/orders')

router.get('/', getOrders);
router.post('/', addOrders);
router.patch('/', changeOrders);

module.exports = router;