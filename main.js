const express = require('express');

const adminroutes = require('./routes/admin');

const server = express();

server.use(adminroutes);

server.use((req,res, next) => {
    res.status(404).send('<h1>Page not Found Boy!</h1>');
});


server.listen(3000);