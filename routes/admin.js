const express = require('express');
const path = require('path');
const Product = require('../views/models/product'); // falls benötigt

const router = express.Router();

// GET /admin -> Formular anzeigen
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'addProdukt.html'));
});

// POST /admin/add-product -> Daten in DB speichern
router.post('/add-product', async (req, res) => {
  try {
    const { title, price, description, imageURL } = req.body;
    await Product.create({ title, price, description, imageURL });
    res.status(200).json({ message: 'Produkt gespeichert' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Fehler beim Speichern' });
  }
});

exports.routes = router;
