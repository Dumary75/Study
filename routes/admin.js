const express = require('express');
const path = require('path');

const router = express.Router();

let products = [{title: 'erster'}];

// GET-Request auf /admin
router.get('/', (req, res) => {
  // '..' geht einen Ordner hoch, da __dirname /routes ist
  res.sendFile(path.join(__dirname, '..', 'views', 'addProdukt.html'));
});

exports.routes = router;
exports.products = products;
