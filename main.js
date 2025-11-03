const express = require('express');
const db = require('./util/database');
const User = require('./views/models/user');
const Product = require('./views/models/product');

const adminData = require('./routes/admin');
const shopData = require('./routes/shop');

const server = express();

server.use(express.static('public'));
server.use(express.json());

server.set('view engine', 'pug');

server.use('/admin',adminData.routes);
server.use(shopData.routes);

server.use((req,res, next) => {
    res.status(404).send('<h1>Page not Found Boy!</h1>');
});


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);


db
.sync()
.then(result => {
 return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({ name: 'sam', email: 'test@web.de' })
    }
    return user;
})
.then((user) => {
    server.listen(3000);
})
.catch((err) => {
    console.log(err);
})

