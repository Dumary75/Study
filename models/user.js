
const mongodb = require('mongodb');
const getDb  = require('../util/database').getDb;

class User {

  constructor( email, password ){
    this.email = email,
    this.password = password
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

  static findById( userId ){
    const db = getDb();
    return db
      .collection('users')
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }


}


module.exports = User;