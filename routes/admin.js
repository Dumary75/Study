const express = require('express');

const router = express.Router();

router.get('/',(req, res, next) => {
 res.send('<h1>Hallo MainPage</h1>')
 next();
})

router.use('/produkt', (req, res, next) => {
 res.send('<h1>Hallo Produkt</h1>')
})


module.exports = router;