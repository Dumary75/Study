
const express = require('express');
const { products } = require('./admin');

const router = express.Router();

router.get('/',(req, res, next) => {
 res.render('shop', {titleProb: 'ShopSeite' , products: products});
})

exports.routes = router;