const router = require('express').Router();

const {
    getStaff,
    getStaffs,
    delStaff
} = require('../controllers/staff');

router.get('/staff/me', getStaff);
router.get('/staff', getStaffs);
router.delete('/staff/:staffId', delStaff);


module.exports = router;
