const express = require('express');
const { createRide } = require('../controllers/rideController');
const router = express.Router();

router.post('/create', createRide);

module.exports = router;  