
const http = require('http');
const fs = require('fs');

function writter(req, res){

    const stream = fs.createWriteStream('output.txt');

    stream.write('Hallo');

    stream.end();

}

const server = http.createServer(writter);

server.listen(3000);


