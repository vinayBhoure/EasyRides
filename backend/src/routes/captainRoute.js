const express = require('express')
const router = express.Router()
const verifyUser  = require('../middlewares/verifyUser')

const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain, terminateCaptain } = require('../controllers/captainController')
const { validateLogin } = require('../middlewares/validateZod')
router.post('/register', registerCaptain)
router.post('/login', validateLogin, loginCaptain)
router.get('/getCaptain', verifyUser, getCaptainProfile)
router.get('/logout', verifyUser, logoutCaptain)
router.delete('/delete', verifyUser, terminateCaptain)

module.exports = router