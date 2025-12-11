
const mongodb = require('mongodb');
const getDb  = require('../util/database').getDb;

class User {

  constructor( email, password, cart, id ){
    this.email = email
    this.password = password
    this.cart = cart
    this.id = id
  };

  save(){
  const db = getDb();
   return db
   .collection('users')
   .insertOne(this)
   .then((resault) =>
        console.log(resault)
      )
      
   .catch((err) => console.log(err));
      
  };

  addToCart(product){
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp.id === product.id;
    // })

  const updatedCart = { items: [{ ...product, quantity: 1}] };
  const db = getDb();
  return db
   .collection('users')
   .updateOne(
    { _id: new mongodb.ObjectId(this.id)},
    { $set: { cart: updatedCart }}
   );

  };

  static findById( userId ){
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => { return user})
  };


}


module.exports = User;