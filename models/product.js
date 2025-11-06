
const getDb = require('../util/database').getDb;

class Product{

constructor(title,price,imageUrl,description){
  title = this.title,
  price = this.price,
  imageUrl = this.imageUrl,
  description = this.description
};

save(){
  
}

}

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
