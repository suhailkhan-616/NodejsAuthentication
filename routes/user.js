const express = require('express');
const router  = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/'},
),userController.createSession);

router.get('/sign-out',userController.destroysession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),userController.createSession);

router.use('/home',require('./home'));

// forget
router.get('/forgetPassword',userController.forgetRender);

router.post('/reset',userController.reset);

router.get('/reset-password',userController.resetPassword);

router.post('/new-password',userController.updatePassword);
module.exports = router;