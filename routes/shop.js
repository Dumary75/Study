
const express = require('express');
const db = require('../util/database');
const { products } = require('./admin');

const router = express.Router();

router.get('/',(req, res, next) => {
    db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
        ['AndereTest', '9.79', 'bkaiskda', '']
    )
    db.execute('SELECT * FROM products').then(([rows]) => {
        res.render('shop', {titleProb: 'ShopSeite' , products: rows});
    }).catch((error) => {
        console.log(error);
    })
})

exports.routes = router;