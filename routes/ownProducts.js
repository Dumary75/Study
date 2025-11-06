
const express = require('express');
const Product = require('../views/models/product');

const router = express.Router();

router.get('/',async(req, res, next) => {

    try {
        const products = await req.user.getProducts();

        res.render('shop', {
            titleprob: 'Eigene Produkte',
            products
        });

    } catch (err){
        console.log(err);
    }
})

module.exports = { routes: router };