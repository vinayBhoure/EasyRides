const express = require('express');
const createRide = require('../controllers/rideController');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser')

router.post('/create', verifyUser, createRide);
module.exports = router;  