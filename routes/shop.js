
const express = require('express');
const Product = require('../views/models/product');

const router = express.Router();

router.get('/',async(req, res, next) => {

    try {
        const products = await Product.findAll();

        res.render('shop', {
            titleprob: 'Shopseite',
            products
        });

    } catch (err){
        console.log(err);
    }
})

module.exports = { routes: router };