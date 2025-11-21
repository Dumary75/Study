const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

const session = require('express-session');
const MongoDBseason = require('connect-mongodb-session')(session);

const store = new MongoDBseason({
  uri: 'mongodb+srv://firstOne:9lPVJUcMUK9yrURY@schwarzmuller.yuepgkj.mongodb.net/?appName=Schwarzmuller',
  colletion: 'sessions'
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'mySecret', resave: false,  saveUninitialized: false, store: store}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://firstOne:9lPVJUcMUK9yrURY@schwarzmuller.yuepgkj.mongodb.net/?appName=Schwarzmuller'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
