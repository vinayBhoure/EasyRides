const express = require('express')
const router = express.Router()
const verifyCaptain  = require('../middlewares/verifyUser')

const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain, terminateCaptain } = require('../controllers/captainController')
const { validateLogin } = require('../middlewares/validateZod')
router.post('/register', registerCaptain)
router.post('/login', validateLogin, loginCaptain)
router.get('/getCaptain', verifyCaptain, getCaptainProfile)
router.get('/logout', verifyCaptain, logoutCaptain)
router.delete('/delete', verifyCaptain, terminateCaptain)

module.exports = router