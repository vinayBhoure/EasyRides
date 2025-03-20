const express = require('express');
const { createRide, getFare } = require('../controllers/rideController');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser')

router.post('/create', verifyUser, createRide);
router.get('/getFare', verifyUser, getFare);
module.exports = router;  