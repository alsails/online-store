const router = require('express').Router();

const {getManufacturers} = require('../controllers/manufacturers')

router.get('/', getManufacturers);

module.exports = router;