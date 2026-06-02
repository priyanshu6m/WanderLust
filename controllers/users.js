const User = require('../models/user');

module.exports.rendereSignupForm = (req, res) => {
  res.render('users/signup');
};

module.exports.signup = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash('success', 'Welcome to Wanderlust!');
        res.redirect('/listings');
      });
      
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/signup');
    }
  };

module.exports.renderLoginForm =  (req, res) => {
  res.render('users/login');
};

module.exports.login = async (req, res, next) => {
    req.flash('success', 'Welcome back to Wanderlust!');
    const redirectURL = res.locals.redirectURL || '/listings';
    res.redirect(redirectURL);
  };

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if(err){
      return next(err);
    }
    req.flash('success', 'You have been logged out');
    res.redirect('/listings');
  })
};