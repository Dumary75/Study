const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('693309c3d91a4bf1e29c4711')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://firstOne:9lPVJUcMUK9yrURY@schwarzmuller.yuepgkj.mongodb.net/shop?appName=Schwarzmuller'
  )
  .then(async result => {
    let user = await User.findOne();

    if (!user) {
      user = new User({
        name: 'Fritz',
        email: 'test@web.de',
        cart: { items: [] }
      });
      await user.save();
    }

    // 🔥 WICHTIG: Middleware einfügen!
    app.use(async (req, res, next) => {
      const user = await User.findOne();
      req.user = user;       // <-- Jetzt ist req.user gesetzt!
      next();
    });

    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

