const router = require('express').Router();

const {
    getStaff,
} = require('../controllers/staff');

router.get('/staff/me', getStaff);


module.exports = router;
