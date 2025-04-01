const express = require('express');
const router = express.Router();

const verifyUser = require('../middlewares/verifyUser')
const verifyCaptain = require('../middlewares/verifyCaptain');
const { createRide, getFare, confirmRide, startRide, endRide, cancelRide } = require('../controllers/rideController');

router.post('/create', verifyUser, createRide);
router.get('/getFare', verifyUser, getFare);
router.put('/confirmRide', verifyCaptain, confirmRide)
router.put('/startRide', verifyCaptain, startRide);
router.put('/endRide', verifyCaptain, endRide);
router.put('/cancelRide', verifyCaptain, cancelRide);

module.exports = router;  