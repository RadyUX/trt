const { Sequelize,DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isValidated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
},
  role: {
    type: DataTypes.ENUM('recruiter', 'candidate', 'consultant', 'admin'),
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true
}

});

module.exports = User;
