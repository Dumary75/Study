const express = require('express');
const path = require('path');
const Product = require('../views/models/product'); // falls benötigt

const router = express.Router();

// GET /admin -> Formular anzeigen
router.get('/addProduct', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'addProdukt.html'));
});

// POST /admin/add-product -> Daten in DB speichern
router.post('/add-product', async (req, res) => {
  try {
    const { title, price, description, imageURL } = req.body;
    await req.user.createProduct({ title, price, description, imageURL });
    res.status(200).json({ message: 'Produkt gespeichert' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Fehler beim Speichern' });
  }
});


//-----------------------------------------------------

// GET /admin/editProdukt -> Daten in Frontend ausgeben
router.get('/edit-product/:id', (red,res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'editProdukt.html'));
});


router.get('/api/product/:id', async (req, res) => {
 const product = await Product.findByPk(req.params.id);
 res.json(product);
});


// POST /admin/editProdukt -> Daten in DB verändern
router.post('/api/product/:id', async(req, res) => {
   try {
    const { title, price, description, imageURL } = req.body;
    await Product.update(
    { title, price, description, imageURL },
    { where: { id: req.params.id } }
  );
    res.status(200).json({ message: 'Produkt gespeichert' });
   }catch(err) {console.log(err)}

});


// DELETE METHODE
router.delete('/api/product/:id', async (req, res) => {
  try {
    const result = await Product.destroy({
      where: { id: req.params.id }
    });

    if (result === 0) {
      return res.status(404).json({ message: 'Produkt nicht gefunden' });
    }

    res.status(200).json({ message: 'Produkt gelöscht' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Löschen' });
  }
});







exports.routes = router;
