const express = require('express')
const router = express.Router()
const verifyCaptain = require('../middlewares/verifyCaptain')

const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain, terminateCaptain, updateCaptainStatus } = require('../controllers/captainController')
const { validateLogin } = require('../middlewares/validateZod')
router.post('/register', registerCaptain)
router.post('/login', validateLogin, loginCaptain)
router.get('/profile', verifyCaptain, getCaptainProfile)
router.put('/update-status', verifyCaptain, updateCaptainStatus)
router.post('/logout', verifyCaptain, logoutCaptain)
router.delete('/delete', verifyCaptain, terminateCaptain)

module.exports = router;