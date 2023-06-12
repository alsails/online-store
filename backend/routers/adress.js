const router = require('express').Router();

const {getCity, getStreet} = require('../controllers/adress')


router.get('/cities', getCity);
router.get('/streets', getStreet);

module.exports = router;