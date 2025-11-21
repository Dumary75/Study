
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login'
  });
};


exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true;
  User.findById('5bab316ce0a7c75f783cb8a8')
    .then(user => {
    req.session.user = user;
  })
  .catch(err => console.log(err));
  res.redirect('/');
};
