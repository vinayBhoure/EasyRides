const express = require('express');
const router = express.Router();
const verifyUser  = require('../middlewares/verifyUser')
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController'); 
const { validateRegister, validateLogin } = require('../middlewares/validateZod');

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyUser, getUserProfile);
router.delete('/logout', verifyUser)

module.exports = router;