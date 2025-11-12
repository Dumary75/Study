
const getDb = require('../util/database').getDb;

class Product{

constructor(title,price,imageUrl,description){
  title = this.title,
  price = this.price,
  imageUrl = this.imageUrl,
  description = this.description
};

save(){
  const db = getDb();
  db.collection('product').insertOne(this).then((resault) =>
    console.log(resault)
  ).catch((err) => console.log(err));
}

}



module.exports = Product;
