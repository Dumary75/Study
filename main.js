
const http = require('http');

const express = require('express');

const start = express();

const server = http.createServer(start);

server.listen(3000);