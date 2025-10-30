const express = require('express');
const db = require('./util/database');

const adminData = require('./routes/admin');
const shopData = require('./routes/shop');

const server = express();

server.use(express.static('public'));


server.set('view engine', 'pug');

server.use('/admin',adminData.routes);
server.use(shopData.routes);

server.use((req,res, next) => {
    res.status(404).send('<h1>Page not Found Boy!</h1>');
});


db
.sync()
.then((resolved) => {
    console.log(resolved);
    server.listen(3000);
})
.catch((err) => {
    console.log(err);
})

