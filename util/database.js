
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = callback => {

MongoClient.connect('mongodb+srv://firstOne:9lPVJUcMUK9yrURY@schwarzmuller.yuepgkj.mongodb.net/?appName=Schwarzmuller')
.then( client => {
  console.log('connected!');
  db = client.db();
  callback();
})
.catch((err) => console.log(err));
};

const getDb = () => {
  if(db){
    return db;
  };
  
  throw 'No Database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb; 



