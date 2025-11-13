const getDb = require('../util/database').getDb;
const mongoDB = require('mongodb');

class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this)
      .then(result => {
        console.log('Product inserted:', result);
        return result;
      })
      .catch(err => console.error('Error inserting product:', err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => console.log(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongoDB.ObjectId(productId) })
      .next()
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => console.log(err));
  }


}

module.exports = Product;
