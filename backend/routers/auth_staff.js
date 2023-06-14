const router = require('express').Router();

const {
    login,
    createStaff,
} = require('../controllers/staff');

router.post('/signin', login);
router.post('/signup', createStaff);

module.exports = router;
