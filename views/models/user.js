const { DataTypes } = require('sequelize');
const db = require('../../util/database');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  // <-- Das ist wichtig!
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;
