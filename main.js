
const http = require('http');

const express = require('express');

const start = express();

start.use((req, res, next) => {
 console.log('Hallo');
 next();
})

start.use('/', (req, res, next) => {
 res.send('<h1>Hallo</h1>')
})

const server = http.createServer(start);

server.listen(3000);