const router = require('express').Router();

const {createSale, getSale} = require('../controllers/sales')

router.post('/', createSale);
router.get('/', getSale);

module.exports = router;