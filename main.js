const express = require('express');
const db = require('./util/database');
const User = require('./views/models/user');
const Product = require('./views/models/product');

const adminData = require('./routes/admin');
const shopData = require('./routes/shop');
const ownProducts = require('./routes/ownProducts');

const server = express();

server.use(express.static('public'));
server.use(express.json());
server.set('view engine', 'pug');

// 💡 Wichtig: Middleware, die req.user setzt (muss VOR den Routen kommen!)
server.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    if (user) {
      req.user = user; // ⬅️ So kann admin.js auf req.user.createProduct() zugreifen
    }
    next();
  } catch (err) {
    console.log(err);
  }
});

server.use('/ownProducts', ownProducts.routes);
server.use('/admin', adminData.routes);
server.use(shopData.routes);

// 404-Handler
server.use((req, res, next) => {
  res.status(404).send('<h1>Page not Found Boy!</h1>');
});

// 🔗 Beziehungen definieren (vor dem Sync)
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// 🧠 Datenbank synchronisieren und Server starten
db.sync()
  .then(async () => {
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({ name: 'sam', email: 'test@web.de' });
    }
    return user;
  })
  .then(() => {
    server.listen(3000, () => console.log('Server läuft auf Port 3000'));
  })
  .catch(err => console.log(err));
