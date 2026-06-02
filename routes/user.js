const express = require('express');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectURL } = require('../middleware');

const userControllers = require('../controllers/users');
const user = require('../models/user');

router
  .route('/signup')
  .get(userControllers.rendereSignupForm)
  .post(wrapAsync(userControllers.signup));

router
  .route('/login')
  .get(userControllers.renderLoginForm)
  .post(
    saveRedirectURL,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }),
    userControllers.login
  );

router.get('/logout', userControllers.logout);

module.exports = router;
