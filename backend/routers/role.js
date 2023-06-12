const router = require('express').Router();

const {createRole} = require('../controllers/role')

router.post('/', createRole);

module.exports = router;