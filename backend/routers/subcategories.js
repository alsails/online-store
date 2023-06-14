const router = require('express').Router();

const {createSubCategories, getSubCategories} = require('../controllers/subCategories')

router.post('/', createSubCategories);
router.get('/', getSubCategories);

module.exports = router;