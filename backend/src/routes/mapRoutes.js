const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser')
const { getCordinates, getDistance, getSuggestions } = require('../controllers/mapController')


router.get('/getCordinates', verifyUser, getCordinates);
router.get('/getDistance', verifyUser, getDistance);
router.get('/getSuggestions', verifyUser, getSuggestions);

module.exports = router;