const express = require('express');
const router  = express.Router();
const passport = require('passport');

const homeController = require('../controllers/home_controller');

router.get('/',passport.checkAuthentication,homeController.home);

module.exports = router;