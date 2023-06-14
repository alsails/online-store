const router = require('express').Router();

const {
    getUser,
    updateUserInfo,
    getUsers
} = require('../controllers/users');

router.get('/me', getUser);
router.get('/', getUsers);
router.patch('/me', updateUserInfo);

module.exports = router;
