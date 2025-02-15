const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/verifyUser')
const { registerUser, loginUser, getUserProfile, logoutUser, terminateUser } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middlewares/validateZod');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/profile', verifyUser, getUserProfile);
router.get('/logout', verifyUser, logoutUser)
router.delete('/delete', verifyUser, terminateUser)

module.exports = router;