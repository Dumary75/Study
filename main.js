const express = require('express');

const adminData = require('./routes/admin');
const shopData = require('./routes/shop');

const server = express();

server.use('/admin',adminData.routes);
server.use(shopData.routes);

server.use((req,res, next) => {
    res.status(404).send('<h1>Page not Found Boy!</h1>');
});


server.listen(3000);