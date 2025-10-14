const express = require('express');

const router = express.Router();

let products = [];

router.use((req, res, next) => {
 res.send('<h1>Hallo AdminPage</h1>')
})


exports.routes = router;
exports.products = products;