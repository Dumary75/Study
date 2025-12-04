const User = require('../models/user');
const Bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: email})
  .then( user => {
       if (!user){
        console.log('Wrong Data!');
        return res.redirect('/login');
       }

       Bcrypt.compare(password, user.password)
       .then(result => {
        if(result){
          console.log('Success!')
          req.session.isLoggedIn = true;
          req.session.user = user;
          req.session.save(err => {
            console.log(err);
            res.redirect('/login');
          });
        } else {
          console.log('Password is not correct!')
          return res.redirect('/login');
        };
       })
       .catch(err => {console.log('FEHLER bei compare: ' + err)});
 });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if( userDoc ){
      console.log('User already exist!'),
      res.redirect('/') 
      }

    return Bcrypt.hash(password, 12);
    })

    .then(hashedpassword => {
      const user = new User({
      email: email,
      password: hashedpassword
    })
      return user.save();
    })

    .then(result => res.redirect('/login'))
    .catch(err => console.log('ERROR: ' + err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
