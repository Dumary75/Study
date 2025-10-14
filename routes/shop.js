
const express = require('express');

const router = express.Router();

router.get('/',(req, res, next) => {
 res.send('<h1>Hallo ShopPage</h1>')
})

exports.routes = router;