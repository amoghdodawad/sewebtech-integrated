const { signUp, logIn, verifyRole, verifyLoggedIn } = require('../controllers/authController.js');
const router = require('express').Router();

router.post('/signup',signUp);
router.post('/login',logIn); 
router.post('/verifyrole',verifyRole);
router.post('/verifyloggedin',verifyLoggedIn)

module.exports = {
    userRouter : router
}